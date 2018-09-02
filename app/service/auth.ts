import { Service } from 'egg';
import * as jwt from 'jsonwebtoken';

export interface SignInPayload {
  mobile: string;
  password: string;
}

export interface SignUpPayload {
  mobile: string;
  password: string;
}

/**
 * Auth Service
 */
export default class Auth extends Service {

  public async signIn(payload: SignInPayload) {
    const { ctx, service, app } = this;

    try {
      const { mobile } = payload;
      const user = await service.user.findByMobile(mobile);

      if (!user) {
        ctx.helper.success({
          ctx,
          code: 0,
          data: { mobile },
          message: ctx.__('Auth_mobile_not_found'),
        });
      } else {
        const verifyPassword = await ctx.compare(payload.password, user.password);

        if (verifyPassword) {
          // 生成Token令牌
          const token = jwt.sign({
            data: user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
          }, app.config.jwt.secret);

          ctx.helper.success({
            ctx,
            data: {
              user: ctx.helper.getUserProfile(user),
              token,
            },
            message: ctx.__('Auth_signin_success'),
          });
        } else {
          ctx.helper.success({
            ctx,
            code: -1,
            data: '',
            message: ctx.__('Auth_signin_password_error'),
          });
        }
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * 用户注册
   * @param payload
   */
  public async signUp(payload: SignUpPayload) {
    const { ctx, service, app } = this;
    try {
      // 手机号是否注册过
      const { mobile } = payload;
      const verifyMobile = await service.user.findByMobile(mobile);
      if (verifyMobile) {
        ctx.helper.success({
          ctx,
          code: 0,
          data: { mobile },
          message: ctx.__('Auth_mobile_used'),
        });
      } else {
        const user = await service.user.create(payload);
        if (!user) {
          ctx.throw(401, ctx.__('Auth_signup_error'));
        } else {
          // 生成Token令牌
          const token = jwt.sign({
            data: user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
          }, app.config.jwt.secret);

          ctx.helper.success({
            ctx,
            data: {
              user: ctx.helper.getUserProfile(user),
              token,
            },
            message: ctx.__('Auth_signup_success'),
          });
        }
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
