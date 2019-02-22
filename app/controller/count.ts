import { Context } from 'egg'
import BaseController from './base'

class CountController extends BaseController {

  constructor(ctx: Context) {
    super(ctx)
  }

  /**
   * 获取统计记录
   */
  public async show() {
    const { ctx, service } = this
    const { type, targetId, key } = ctx.params
    const res = await service.count.findByKey(type, targetId, key)
    this.success({ code: 1, data: res })
  }
}

export default CountController
