
// 处理操作成功响应
export const success = ({ ctx, code = 1, data = null, message = '请求成功' }) => {
  ctx.body = {
    code,
    data,
    message
  }
  ctx.status = 200;
}

export const getUserProfile = (user: object) => {
  user['password'] = undefined;
  return user;
}