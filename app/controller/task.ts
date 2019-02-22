import { Context } from 'egg'
import BaseController from './base'

class TaskController extends BaseController {

  private taskCreateTransfer: ITaskCreateTransfer
  private taskUpdateTransfer: ITaskUpdateTransfer

  constructor(ctx: Context) {
    super(ctx)

    this.taskCreateTransfer = {
      user_id: { type: 'number', required: true, allowEmpty: false },
      title: { type: 'string', required: true, allowEmpty: false },
      content: { type: 'string', required: true, allowEmpty: false },
    }

    this.taskUpdateTransfer = {
      id: { type: 'number', required: true, allowEmpty: false },
      user_id: { type: 'number', required: true, allowEmpty: false },
      title: { type: 'string', required: true, allowEmpty: false },
      content: { type: 'string', required: true, allowEmpty: false },
    }
  }

  /**
   * 任务列表
   */
  public async list() {
    const { service } = this
    const conditions = {
      x_status: {
        $in: [ 1 ],
      },
    }

    // TODO 搜索过滤条件
    const { data, pagination } = await service.task.list({
      conditions,
    })
    this.page(data, pagination)
  }

  /**
   * 任务详情
   */
  public async show() {
    const { ctx, service } = this
    const { taskId } = ctx.params
    const res = await service.task.show(taskId)
    this.success({ code: 1, data: res })
  }

  /**
   * 创建任务
   */
  public async create() {
    const { ctx, service } = this
    const payload = ctx.request.body
    payload.user_id = this.currentUserId

    ctx.validate(this.taskCreateTransfer, payload)
    const res = await service.task.create(payload)
    this.success({ code: 1, data: res })
  }

  /**
   * 更新任务
   */
  public async update() {
    const { ctx, service } = this
    const { taskId } = ctx.params
    const payload = ctx.request.body
    payload.user_id = this.currentUserId

    ctx.validate(this.taskUpdateTransfer, payload)
    const res = await service.task.update(taskId, payload)
    this.success({ code: 1, data: res })
  }

  /**
   * 删除任务
   */
  public async delete() {
    const { ctx, service } = this
    const { taskId } = ctx.params
    const res = await service.task.delete(taskId)
    this.success({ code: 1, data: res })
  }
}

export default TaskController
