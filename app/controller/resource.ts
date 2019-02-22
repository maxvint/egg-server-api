import { Context } from 'egg'
import BaseController from './base'

class ResourceController extends BaseController {

  private resourceCreateTransfer: IResourceCreateTransfer
  private resourceUpdateTransfer: IResourceUpdateTransfer

  constructor(ctx: Context) {
    super(ctx)

    this.resourceCreateTransfer = {
      task_id: { type: 'string', required: true, allowEmpty: false },
      title: { type: 'string', required: true, allowEmpty: false },
      path: { type: 'string', required: true, allowEmpty: false },
    }

    this.resourceUpdateTransfer = {
      id: { type: 'string', required: true, allowEmpty: false },
      task_id: { type: 'string', required: true, allowEmpty: false },
      title: { type: 'string', required: true, allowEmpty: false },
      path: { type: 'string', required: true, allowEmpty: false },
    }
  }

  /**
   * 资源列表
   */
  public async list() {
    const { service } = this
    const conditions = {
      x_status: { $in: [ 1 ] },
      user_id: this.currentUserId,
      c_resource: { $gt: 0 }, // 过滤掉没有资源的resource
    }
    const { data, pagination } = await service.resource.list({
      conditions,
    })
    this.page(data, pagination)
  }

  /**
   * 资源详情
   */
  public async show() {
    const { ctx, service } = this
    const { resourceId } = ctx.params
    const res = await service.resource.show(resourceId)
    this.success({ code: 1, data: res })
  }

  /**
   * 添加数据资源
   */
  public async create() {
    const { ctx, service } = this
    const payload = ctx.request.body
    payload.user_id = this.currentUserId

    ctx.validate(this.resourceCreateTransfer, payload)
    const res = await service.resource.create(payload)
    this.success({ code: 1, data: res })
  }

  /**
   * 更新资源
   */
  public async update() {
    const { ctx, service } = this
    const { resourceId } = ctx.params
    const payload = ctx.request.body
    payload.user_id = this.currentUserId

    ctx.validate(this.resourceUpdateTransfer, payload)
    const res = await service.resource.update(resourceId, payload)
    this.success({ code: 1, data: res })
  }

  /**
   * 删除资源
   */
  public async delete() {
    const { ctx, service } = this
    const { resourceId } = ctx.params
    const res = await service.resource.delete(resourceId)
    this.success({ code: 1, data: res })
  }
}

export default ResourceController
