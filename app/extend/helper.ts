import * as crypto from 'crypto'
import * as path from 'path'
import * as fs from 'fs'
import * as request from 'request'
import { IUserItem } from '../service/user'

export const inArray = (needle: string, haystack: string[], argStrict) => {
  // example 1: inArray('van', ['Kevin', 'van', 'Zonneveld'])
  // returns 1: true
  // example 2: inArray('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'})
  // returns 2: false
  // example 3: inArray(1, ['1', '2', '3'])
  // example 3: inArray(1, ['1', '2', '3'], false)
  // returns 3: true
  // returns 3: true
  // example 4: inArray(1, ['1', '2', '3'], true)
  // returns 4: false
  const strict = !!argStrict
  let key = ''

  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true
      }
    }
  } else {
    for (key in haystack) {
      /* tslint:disable */
      if (haystack[key] == needle) {
        return true
      }
    }
  }

  return false
}

// 处理操作成功响应
export const success = ({ ctx, code = 1, data = null, message = '请求成功' }: any): void => {
  ctx.body = {
    code,
    data,
    message,
  }
  ctx.status = 200
}

/**
 * 解析token
 * @param header 浏览器header头
 */
export const parseToken = (header: string): string => {
  const tokenRegx = /[bB]earer ((\w|.|-)+)/
  const group = header.match(tokenRegx)
  if (group) {
    return group[1]
  }
  return ''
}

export const md5 = (text: string): string => {
  return crypto.createHash('md5').update(text).digest('hex')
}

/**
 * base64 加密
 * @param body
 * @param type
 */
export const base64Encode = (body: any, json: boolean = false) => {
  // json 转换为json格式
  if (json) {
    return (new Buffer(JSON.stringify(body))).toString('base64')
  } else {
    return (new Buffer(body)).toString('base64')
  }
}

/**
 * base64解密
 * @param body 
 * @param type 
 */
export const base64Decode = (body: any, type: string = 'base64') => {
  return (new Buffer(body, type)).toString('utf8')
}

/**
 * hash_hmac 加密
 * update 更新hash的内容为指定的data。当使用流数据时可能会多次调用该方法
 * digest 计算所有传入数据的hash摘要 'hex', 'binary' 或者'base64'
 * [hashHmac description]
 */
export const hashHmac = (body: any, secret: string) => {
  return crypto.createHmac('sha1', secret).update(body).digest()
}

/**
 * 生成指定长度的字符串
 * @param len 长度
 */
export const generateRadomStr = (len: number = 6): string => {
  const str = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let code = ''
  let dig = 0

  for (let i = 0; i < len; i++) {
    dig = Math.floor(Math.random() * 35)
    if (dig === 35) {
      dig = 0
    }
    code += str[dig]
  }
  return code
}

/**
 * 格式化用户手机号
 * @param mobile 手机号
 */
export const formatMobile = (mobile: string): string => {
  const mobileReg = /^[1][34578]\d{9}$/
  if (mobileReg.test(mobile)) {
    return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }
  return mobile
}

/**
 * 过滤用户信息中的密码
 * @param user
 */
export const filterUser = (user: IUserItem) => {
  if (user.password) {
    delete user.password
  }
  if (user.mobile) {
    user.mobile = formatMobile(user.mobile)
  }
  return user
}

/**
 * 给redis队列中插入待标注的resource任务
 * @param redis redis实例
 * @param taskId 任务ID
 * @param resourceIds 待标注的数据ID列表
 * @todo 如何更新队列？什么时候更新？
 */
export const insertUnmarkedResource = async (redis: any, taskId, resourceIds): Promise<any> => {
  return await redis.lpush(`task:${taskId}:unmarked`, resourceIds)
}

/**
 * 给redis队列中插入待质检的resource任务
 * @param redis redis实例
 * @param taskId 任务ID
 * @param resourceIds 待质检的数据ID列表
 * @todo 如何更新队列？什么时候更新？
 */
export const insertUncheckedResource = async (redis: any, taskId, resourceIds): Promise<any> => {
  return await redis.lpush(`task:${taskId}:unchecked`, resourceIds)
}

/**
 * 从redis队列中获取未标注的数据
 * @param redis redis实例
 * @param taskId 任务ID
 */
export const popUnmarkedResource = async (redis: any, taskId: number): Promise<any> => {
  return await redis.rpop(`task:${taskId}:unmarked`)
}

/**
 * 从redis队列中获取未质检的数据
 * @param redis redis实例
 * @param taskId 任务ID
 */
export const popUncheckedResource = async (redis: any, taskId: number): Promise<any> => {
  return await redis.rpop(`task:${taskId}:unchecked`)
}

/**
 * 路径是否存在，不存在则创建
 */
export const checkDirExists = async (dir: string) => {
  const isExists = await getStat(dir) as any
  // 如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) {
    return true
  } else if (isExists) { // 如果该路径存在但是文件，返回false
    return false
  }
  // 如果该路径不存在
  const tempDir = path.parse(dir).dir // 拿到上级路径
  // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  const status = await checkDirExists(tempDir)
  let mkdirStatus: any
  if (status) {
    mkdirStatus = await mkdir(dir)
  }
  return mkdirStatus
}

export const getStat = async (path: string) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, status: fs.Stats) => {
      !err ? reject(false) : resolve(status)
    })
  })
}

export const mkdir = async (dir: string) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      !err ? reject(false) : resolve(true)
    })
  })
}

export const downloadFile = (uri: string, filename: string, callback: (filename) => void) => {
  const stream = fs.createWriteStream(filename)
  request(uri).pipe(stream).on('close', () => {
    callback(filename)
    // console.log(`${filename} download success`)
  })
  stream.on('finish', () => {
    // console.log(`${filename} written success`)
  })
}
