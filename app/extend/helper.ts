
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

export const parseToken = (header: string) => {
  const tokenRegx = /[bB]earer ((\w|.|-)+)/;
  const group = header.match(tokenRegx);
  if (group) {
    return group[1];
  }
  return false;
}