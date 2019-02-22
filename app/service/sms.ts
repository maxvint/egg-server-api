/**
 * Sms Service
 */
import { Context } from 'egg'
import BaseService from './base'
import * as moment from 'moment'
import * as SmsClient from '@alicloud/sms-sdk'

class SmsService extends BaseService {

  public cmodel: any
  protected redis: any

  constructor(ctx: Context) {
    super(ctx)

    this.redis = this.app.redis
    this.config = this.app.config
    this.cmodel = ctx.model.Sms
  }

  /**
   * 发送短信验证码
   * @param mobile 手机号
   */
  public async sendSMSCode(mobile: string): Promise<ISucessResponse> {
    const { ctx } = this
    const { alisms } = this.config

    // 生成短信验证码
    let radomCode = ctx.helper.generateRadomNumber(6)

    // 每日发送次数限制
    const checkLimit = await this.checkSMSLimit(mobile)
    if (!checkLimit) {
      return {
        data: '',
        message: '今日发送次数已达上限',
        code: -1,
      }
    }

    // 发送验证码
    const sms = await this.aliyunSendSMS(mobile, radomCode)

    // 添加验证码记录
    const result = await this.addSMSRecord(alisms.TemplateCode, mobile, radomCode, sms)

    if (sms.Code !== 'OK') {
      return {
        data: '',
        message: '发送失败',
        code: 0,
      }
    }

    // 缓存验证码
    await this.cacheVerifyCode(mobile, radomCode)

    // 真实发送时返回的code为空
    if (alisms.RealSendFlag) {
      radomCode = ''
    }

    if (!result) {
      return {
        data: '',
        message: '获取失败',
        code: -2,
      }
    }

    return {
      data: radomCode,
      message: '获取成功',
      code: 1,
    }
  }

  /**
   * 验证短信验证码
   * @param mobile 手机号
   * @param code 验证码
   */
  public async checkSMSCode(
    mobile: string,
    code: string,
  ): Promise<ISucessResponse> {
    const checkCode = await this.checkVerifyCode(mobile, code)

    if (!checkCode) {
      return {
        data: '',
        message: '验证码错误',
        code: 0,
      }
    }

    return {
      data: '',
      message: '验证成功',
      code: 1,
    }
  }

  /**
   * 校验验证码是否正确
   * @param mobile 手机号
   * @param code 验证码
   */
  public async checkVerifyCode(
    mobile: string,
    code: string,
  ): Promise<boolean> {
    const result = await this.redis.get(`sms_code:${mobile}`)
    if (result && result === code) {
      this.redis.del(`sms_code:${mobile}`)
      return true
    }
    return false
  }

  /**
   * 更新短信发送记录
   * @param tempId 短信模板ID
   * @param mobile 手机号
   * @param content 发送内容
   * @param resultInfo 回调信息
   */
  private async addSMSRecord(tempId: number, mobile: string, content: string, resultInfo: any): Promise<any> {
    const data = {
      temp_id: tempId,
      mobile,
      content,
      result_info: JSON.stringify(resultInfo),
      x_status: resultInfo.Code === 'OK' ? 1 : 0, // 是否发送成功
    }
    const result = await this.cmodel.create(data)
    return result
  }

  /**
   * 阿里云短信发送
   * @param mobile 手机号
   * @param code 验证码
   */
  private async aliyunSendSMS(mobile: string, code: string): Promise<any> {
    const alisms = this.config.alisms
    const smsClient = new SmsClient({
      accessKeyId: alisms.AccessKeyId,
      secretAccessKey: alisms.AccessKeySecret,
    })

    // 真实发送
    if (alisms.RealSendFlag) {
      // 发送短信
      return await smsClient.sendSMS({
        PhoneNumbers: mobile,
        SignName: alisms.SignName,
        TemplateCode: alisms.TemplateCode,
        TemplateParam: JSON.stringify({
          code,
        }),
      })
    }

    return {
      Code: 'OK',
      RealSendFlag: alisms.RealSendFlag,
      Test: 1,
    }
  }

  /**
   * 缓存短信验证码至redis中
   * @param mobile 手机号
   * @param code 验证码
   */
  private async cacheVerifyCode(mobile: string, code: string) {
    await this.redis.set(`sms_code:${mobile}`, code, 'EX', this.config.app.smsExpireSeconds)
  }

  /**
   * 判断每日发送是否达到上限
   * @param mobile 手机号
   */
  private async checkSMSLimit(mobile: string): Promise<boolean> {
    const lastDay = moment().utc().subtract(0, 'd').format('YYYY-MM-DD')
    const result = await this.cmodel.count({
      where: {
        mobile,
        created_at: { gt: lastDay },
      },
    })

    return result < this.config.app.smsLimitPerDay
  }

}

export default SmsService
