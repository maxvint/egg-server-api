import { Application } from 'egg';
const jwt = require('jsonwebtoken');

export default (app: Application) => {
  return async function userInterceptor (ctx, next) {
    console.log('userInterceptor before');

    ctx.state.user = {
      is_auth: false,
      message: '用户未登录',
      info: {},
    };
    let user_id = 0;

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
    try {
      const decoded = jwt.verify(accessToken, app.config.jwt.secret);
      user_id = decoded.data.id;
    } catch (err) {
      console.log(err);
    }

    const user = ctx.model.User.findById(user_id);

    if (!user) {
      ctx.state.user.message = '用户身份异常';
      return await next();
    }

    user.password = null;
    ctx.state.user.is_auth = true;
    ctx.state.user.info = user;
    await next();
  }
};
