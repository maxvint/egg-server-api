import { Application } from 'egg';
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
  return async function userInterceptor (ctx, next) {
    console.log('userInterceptor before');

    ctx.state.user = {
      isAuth: false,
      message: '用户未登录',
      info: {},
    };

    const accessTokenHeaderStr = ctx.request.headers.authorization || false;

    if (!accessTokenHeaderStr) {
      ctx.state.user.message = '缺少token';
      return await next();
    }

    const accessToken = ctx.helper.parseToken(accessTokenHeaderStr);
    if (!accessToken) {
      ctx.state.user.message = '格式异常';
      return await next();
    }

    // token异常过期后，刷新重新返回token
    const decoded = await jwt.verify(accessToken, app.config.jwt.secret);
    const { _id: userId } = decoded['data'];
    const user = await ctx.model.User.findById(userId);

    if (!user) {
      ctx.state.user.message = '用户身份异常';
      return await next();
    }

    user.password = null;
    ctx.state.user.isAuth = true;
    ctx.state.user.info = user;
    ctx.state.user = {
      isAuth: true,
      info: user,
      message: '认证成功',
    };

    await next();
  };
};
