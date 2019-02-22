import { Application } from 'egg'
import * as jwt from 'jsonwebtoken'

export default (app: Application) => {
  return async function userInterceptor (ctx: any, next: any) {
    const accessTokenHeaderStr = ctx.request.headers.authorization || false
    let userId: number

    if (!accessTokenHeaderStr) {
      ctx.state.user.message = '缺少Token'
      ctx.throw(401, ctx.__('JWT_user_token_missing'))
      return await next()
    }

    const accessToken = ctx.helper.parseToken(accessTokenHeaderStr)
    if (!accessToken) {
      ctx.throw(401, ctx.__('JWT_user_token_error'))
      return await next()
    }

    // token异常过期后，刷新重新返回token
    try {
      const decoded = await jwt.verify(accessToken, app.config.jwt.secret)
      /* tslint:disable:no-string-literal */
      userId = decoded['data']['id'] as number
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        ctx.throw(401, ctx.__('JWT_user_token_expired'))
      } else {
        ctx.throw(401, ctx.__('JWT_user_token_parse_error'))
      }
      return await next()
    }

    const user = await ctx.model.User.findByPk(userId)
    if (!user) {
      ctx.throw(401, ctx.__('JWT_user_not_found'))
      return await next()
    }

    ctx.user = user
    await next()
  }
}
