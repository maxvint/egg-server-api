import * as bcryptjs from 'bcryptjs'
import * as crypto from 'crypto'
import { IUserItem } from '../service/user';

// 处理操作成功响应
export const success = ({ ctx, code = 1, data = null, message = '请求成功' }) => {
  ctx.body = {
    code,
    data,
    message,
  }
  ctx.status = 200
}

export const parseToken = (header: string): string => {
  const tokenRegx = /[bB]earer ((\w|.|-)+)/
  const group = header.match(tokenRegx)
  if (group) {
    return group[1]
  }
  return ''
}

export const md5 = (text: string) => {
  return crypto.createHash('md5').update(text).digest('hex')
}

export const createBcrypt = (value: string, salt: number = 10) => {
  return bcryptjs.hashSync(value, bcryptjs.genSaltSync(salt))
}

export const formatMobile = (mobile: string) => {
  const mobileReg = /^[1][34578]\d{9}$/
  if (mobileReg.test(mobile)) {
    return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }
}

export const filterUser = (user: IUserItem) => {
  delete user.password
  return user
}
