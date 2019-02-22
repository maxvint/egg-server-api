import * as jwt from 'jsonwebtoken'

async function getUserFromToken(ctx: any, accessToken: string) {
  let decoded: any
  try {
    decoded = jwt.verify(accessToken, ctx.app.config.jwt.secret)
  } catch (err) {
    return false
  }
  try {
    /* tslint:disable:no-string-literal */
    const userId = decoded['data']['id'] as number
    const user = await ctx.model.User.findByPk(userId)
    if (user) {
      return user
    }
  } catch (error) {
    return false
  }
}

export default () => {
  return async function userAuth (ctx: any, next: any) {
    const accessTokenHeaderStr = ctx.request.headers.authorization || false
    if (accessTokenHeaderStr) {
      const accessToken = ctx.helper.parseToken(accessTokenHeaderStr)
      if (accessToken) {
        const user = await getUserFromToken(ctx, accessToken)
        if (user) {
          ctx.user = user
        }
      }
    }
    await next()
  }
}
