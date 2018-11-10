import { Application } from 'egg'
import * as jwt from 'jsonwebtoken'

// interface UserInfo {
//   isAuth: boolean
//   message: string
//   info: object
// }

// interface accessToken {
//   data: object
//   exp: number
// }

export default (app: Application) => {
  return async function userInterceptor (ctx, next) {
    ctx.state.user = {
      isAuth: false,
      info: {},
    }

    let userId

    const accessTokenHeaderStr = ctx.request.headers.authorization || false

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
      userId = decoded['data']['_id']
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        ctx.throw(401, ctx.__('JWT_user_token_expired'))
      } else {
        ctx.throw(401, ctx.__('JWT_user_token_parse_error'))
      }
      return await next()
    }

    const user = await ctx.model.User.findById(userId)
    if (!user) {
      ctx.throw(401, ctx.__('JWT_user_not_found'))
      return await next()
    }

    ctx.state.user = {
      isAuth: true,
      info: user,
    }

    await next()
  }
}
