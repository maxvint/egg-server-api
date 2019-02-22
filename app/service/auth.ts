import { Context } from 'egg'
import BaseService from './base'
import { md5 } from '../extend/helper'
import * as jwt from 'jsonwebtoken'
import SmsService from './sms'

export interface ISignInPayload {
  mobile: string
  password: string
}

export interface ISignUpPayload {
  mobile: string
  password: string
  code: string,
  invite_code: string
}

/**
 * Auth Service
 */
class AuthService extends BaseService {
  protected SmsService: SmsService

  constructor(ctx: Context) {
    super(ctx)

    this.cmodel = this.ctx.model.User
    this.SmsService = this.ctx.service.sms
  }

  /**
   * 用户登录
   * @param payload
   */
  public async signIn(payload: ISignInPayload): Promise<ISucessResponse> {
    const { ctx } = this
    const { mobile, password } = payload
    const conditions = {
      x_status: 1,
      mobile,
      password: md5(password),
    }

    // 验证用户是否存在
    const user = await this.cmodel.findOne({
      where: conditions,
      attributes: { exclude: [ 'password' ] },
    })

    // 验证手机号是否注册
    const isMobileExist = await this.checkMobileExist(mobile)
    const isPasswordCorrect = await this.checkPasswordCorrect(mobile, conditions.password)

    if (!user) {
      if (!isMobileExist) {
        return {
          code: -2,
          data: '',
          message: ctx.__('Auth_mobile_not_found'),
        }
      }

      if (isMobileExist && !isPasswordCorrect) {
        return {
          code: -3,
          data: '',
          message: ctx.__('Auth_signin_password_error'),
        }
      }

      return {
        code: 401,
        data: '',
        message: ctx.__('Auth_user_not_found'),
      }
    }

    return {
      code: 1,
      data: {
        user: ctx.helper.filterUser(user.dataValues),
        token: await this.applyUserToken(user.getDataValue('id')),
      },
      message: ctx.__('Auth_signin_success'),
    }
  }

  /**
   * 用户注册
   * @param payload
   */
  public async signUp(payload: ISignUpPayload): Promise<ISucessResponse> {
    const { ctx, service } = this
    // 验证手机号是否注册过
    const { mobile, code } = payload
    const isMobileExist = await this.checkMobileExist(mobile)
    if (isMobileExist) {
      return {
        code: -1,
        data: '',
        message: ctx.__('Auth_mobile_used'),
      }
    }

    // 验证手机验证码
    const verifyCode = await this.SmsService.checkVerifyCode(mobile, code)
    if (!verifyCode) {
      return {
        code: -2,
        data: '',
        message: '手机验证码错误',
      }
    }

    // 创建用户
    const user = await service.user.create(payload)
    if (!user) {
      ctx.throw(401, ctx.__('Auth_signup_error'))
    }

    return {
      code: 1,
      data: {
        user: ctx.helper.filterUser(user.dataValues),
        token: await this.applyUserToken(user.getDataValue('id')),
      },
      message: ctx.__('Auth_signup_success'),
    }
  }

  public async applyUserToken(id: number) {
    const { app } = this
    const data = {
      data: {
        role: 'user',
        id,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
    }
    return jwt.sign(data, app.config.jwt.secret)
  }

  /**
   * 验证手机号是否注册过
   * @param mobile 手机号
   */
  public async checkMobileExist(mobile: string): Promise<boolean> {
    const checkMobile = await this.cmodel.count({
      where: {
        mobile,
      },
    })
    return checkMobile > 0
  }

  /**
   * 验证手机号对应的密码是否正确
   * @param mobile 手机号
   * @param password 密码
   */
  public async checkPasswordCorrect(mobile: string, password: string): Promise<boolean> {
    const checkPssword = await this.cmodel.count({
      where: {
        mobile,
        password,
      },
    })
    return checkPssword > 0
  }
}

export default AuthService
