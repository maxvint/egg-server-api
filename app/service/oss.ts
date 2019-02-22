import { Context, Service, IHelper } from 'egg'
import * as moment from 'moment'

/**
 * Oss Service
 */
class OssService extends Service {
  protected redis: any
  private helper: IHelper
  private taskModel: any
  private toolModel: any

  constructor(ctx: Context) {
    super(ctx)

    this.redis = this.app.redis
    this.config = this.app.config
    this.helper = this.ctx.helper
    this.taskModel = this.ctx.model.Task
  }

  /**
   * 获取公共空间的上传token
   * @param payload
   */
  public async getPublicOSSUptoken(): Promise<any> {
    const { oss } = this.config
    const ossConfig = oss.public
    const { keyId, keySecret, host, expire, maxSize } = ossConfig
    const setMoment = moment().utc().add(expire, 's')
    const conditions = {
      expiration: setMoment.format(),
      conditions: [
        [ 'content-length-range', 0, parseInt(maxSize) ], // 字节
        // $key 上传文件的object名称。 该condition支持精确匹配和starts-with匹配方式
        // ['starts-with', '$key', oss_params['dir']]
      ],
    }
    const base64Policy = this.helper.base64Encode(conditions, true)
    const signature = this.helper.base64Encode(this.helper.hashHmac(base64Policy, keySecret))

    return {
      code: 1,
      data: {
        accessid: keyId,
        host,
        policy: base64Policy,
        signature,
        expire: setMoment.unix(),
        key: '' + new Date().getTime(),
      },
      message: '获取成功',
    }
  }

  /**
   * 获取任务数据上传的OSS Token
   * @param taskId 任务ID
   * @param userId 用户ID
   */
  public async getTaskOSSUptoken(taskId: number, userId: number): Promise<any> {
    const task = this.taskModel.findByPk(taskId)
    if (!task) {
      return {
        code: 0,
        data: '',
        message: '无对应任务',
      }
    }
    // TODO 判断是否为当前用户发布的任务

    const { oss } = this.config
    const ossConfig = oss.private
    const { keyId, keySecret, host, expire, maxSize, callbackUrl, callbackHost } = ossConfig
    const callbackParams = {
      callbackUrl,
      callbackHost,
      callbackBody: 'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&etag=${etag}',
      callbackBodyType: 'application/x-www-form-urlencoded',
    }
    const base64CallbackBody = this.helper.base64Encode(callbackParams, true)
    const setMoment = moment().utc().add(expire, 's')
    const conditions = {
      expiration: setMoment.format(),
      conditions: [
        [ 'content-length-range', 0, parseInt(maxSize) ], // 字节
        // $key 上传文件的object名称。 该condition支持精确匹配和starts-with匹配方式
        // ["starts-with", "$key", oss_params['dir']]
      ],
    }

    const base64Policy = this.helper.base64Encode(conditions, true)
    const signature = this.helper.base64Encode(this.helper.hashHmac(base64Policy, keySecret))
    const keySuffix = new Date().getTime()

    return {
      code: 1,
      data: {
        accessid: keyId,
        host,
        policy: base64Policy,
        signature,
        expire: setMoment.unix(),
        callback: base64CallbackBody,
        key: `${taskId}/${userId}/${keySuffix}`,
        keyPrefix: `${taskId}/${userId}/`,
      },
      message: '获取成功',
    }
  }

  /**
   * 获取工具样例数据上传的OSS Token
   * @param toolId 工具ID
   * @param userId 用户ID
   */
  public async getToolOSSUptoken(toolId: number, userId: number): Promise<any> {
    const tool = this.toolModel.findByPk(toolId)
    if (!tool) {
      return {
        code: 0,
        data: '',
        message: '无对应工具',
      }
    }

    // TODO 判断是否为当前用户发布的工具

    const { oss } = this.config
    const ossConfig = oss.public
    const { keyId, keySecret, host, expire, maxSize, callbackUrl, callbackHost } = ossConfig
    const callbackParams = {
      callbackUrl,
      callbackHost,
      callbackBody: 'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&etag=${etag}',
      callbackBodyType: 'application/x-www-form-urlencoded',
    }
    const base64CallbackBody = this.helper.base64Encode(callbackParams, true)
    const setMoment = moment().utc().add(expire, 's')
    const conditions = {
      expiration: setMoment.format(),
      conditions: [
        [ 'content-length-range', 0, parseInt(maxSize) ], // 字节
        // $key 上传文件的object名称。 该condition支持精确匹配和starts-with匹配方式
        // ["starts-with", "$key", oss_params['dir']]
      ],
    }
    const base64Policy = this.helper.base64Encode(conditions, true)
    const signature = this.helper.base64Encode(this.helper.hashHmac(base64Policy, keySecret))
    const keySuffix = new Date().getTime()

    return {
      code: 1,
      data: {
        accessid: keyId,
        host,
        policy: base64Policy,
        signature,
        expire: setMoment.unix(),
        callback: base64CallbackBody,
        key: `${toolId}/${userId}/${keySuffix}`,
        keyPrefix: `${toolId}/${userId}/`,
      },
      message: '获取成功',
    }
  }

  /**
   * OSS上传回调
   */
  public async uploadCallback() {
    const { ctx } = this
    // const authorization = ctx.request.header.authorization
    // const ossPubkeyURL = ctx.request.header['x-oss-pub-key-url']
    // const path = '/api' + ctx.request.url
    const body = ctx.request.body
    const key = ctx.request.body.filename || 'unkown:' + new Date().getTime()
    // 保存原始回调信息到redis中，命名格式为oss:key
    this.redis.set('oss:' + decodeURIComponent(key), JSON.stringify(body))
    return {
      path: key,
      etag: ctx.request.body.etag,
      result: 'success',
    }
  }
}

export default OssService
