import { Application, Context } from 'egg';
import * as jwt from 'jsonwebtoken';

// interface UserInfo {
//   isAuth: boolean;
//   message: string;
//   info: object;
// }

// interface accessToken {
//   data: object;
//   exp: number;
// }

export default (app: Application) => {
  return async function userInterceptor (ctx: Context, next: any) {
    console.log('userInterceptor before');

    ctx.state.user = {
      isAuth: false,
      info: {},
    };

    const accessTokenHeaderStr = ctx.request.headers.authorization || false;

    if (!accessTokenHeaderStr) {
      ctx.state.user.message = '缺少Token';
      ctx.throw(401, ctx.__('JWT_user_token_missing'));
      return await next();
    }

    const accessToken = ctx.helper.parseToken(accessTokenHeaderStr);
    if (!accessToken) {
      ctx.throw(401, ctx.__('JWT_user_token_error'));
      return await next();
    }

    // token异常过期后，刷新重新返回token
    const decoded = await jwt.verify(accessToken, app.config.jwt.secret);
    const { _id: userId } = decoded['data'];
    const user = await ctx.model.User.findById(userId);

    if (!user) {
      ctx.throw(401, ctx.__('JWT_user_not_found'));
      return await next();
    }

    ctx.state.user = {
      isAuth: true,
      info: user,
    };

    await next();
  };
};
