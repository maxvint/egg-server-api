import { Context } from 'egg'
import BaseController from './base'

class OssController extends BaseController {

  constructor(ctx: Context) {
    super(ctx)
  }

  /**
   * 获取公共空间的上传 Token
   */
  public async getPublicOSSUptoken() {
    const { service } = this
    const { code, data, message } = await service.oss.getPublicOSSUptoken()
    this.success({ code, data, message })
  }

  /**
   * 获取任务数据上传的OSS Token
   */
  public async getTaskOSSUptoken() {
    const { ctx, service } = this
    const { taskId } = ctx.params
    const { code, data, message } = await service.oss.getTaskOSSUptoken(taskId, this.currentUserId)
    this.success({ code, data, message })
  }

  /**
   * 获取工具样例数据上传的OSS Token
   */
  public async getToolOSSUptoken() {
    const { ctx, service } = this
    const { toolId } = ctx.params
    const { code, data, message } = await service.oss.getToolOSSUptoken(toolId, this.currentUserId)
    this.success({ code, data, message })
  }

  /**
   * OSS上传回调
   */
  public async uploadCallback() {
    const { service } = this
    const res = await service.oss.uploadCallback()
    this.success({ code: 1, data: res })
  }
}

export default OssController
