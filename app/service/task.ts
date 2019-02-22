/**
 * Task Service
 */
import { Context } from 'egg'
import BaseService from './base'

class TaskService extends BaseService {

  public cmodel: any

  constructor(ctx: Context) {
    super(ctx)

    this.cmodel = ctx.model.Task
  }

  /**
   * 获取任务列表
   * @param params 数据分页请求参数
   */
  public async list(params: IPageParams): Promise<any> {
    // 关联任务发布者、任务参与者、是否参与任务信息
    const include = [
      {
        model: this.ctx.model.User as any,
        as: 'creator',
        attributes: [ 'id', 'gravatar', 'nickname' ],
        required: true,
      },
    ]

    params.include = include
    params.order = [[ 'id', 'desc' ]]

    // 聚合任务统计信息
    let { data, pagination } = await this.page(params)
    data = await this.updateCount(data)

    return { data, pagination }
  }

  /**
   * 获取任务详情
   * @param taskId 任务ID
   */
  public async show(taskId: number): Promise<any> {
    const { ctx } = this
    const include = [
      {
        model: this.ctx.model.User as any,
        as: 'creator',
        attributes: [ 'id', 'gravatar', 'nickname' ],
        required: true,
      },
    ]
    const conditions = {
      where: {
        id: taskId,
      },
      include,
    }
    const task = await this.cmodel.findOne(conditions)

    if (!task) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }

    // 聚合统计数据
    const count = await this.countService.getTaskCount(task.getDataValue('id'))
    task.setDataValue('count', count)

    return task
  }

  /**
   * 创建任务
   * @param payload 任务信息
   */
  public async create(payload: any): Promise<any> {
    const { ctx } = this
    const task = await this.cmodel.create(payload)
    if (!task) {
      ctx.throw(404, ctx.__('Common_item_create_error'))
    }

    // 更新用户统计
    this.countService.increment({
      type: 'user',
      target_id: this.currentUserId,
      key: 'task_created',
    })

    // 更新任务统计
    this.countService.update({
      type: 'task',
      target_id: task.getDataValue('id'),
      key: 'checker',
      value: '1',
    })

    return task
  }

  /**
   * 更新任务
   * @param taskId 任务ID
   * @param payload 更新内容
   * @todo 增加权限控制
   */
  public async update(taskId: number, payload: any): Promise<any> {
    const { ctx } = this
    const task = await this.cmodel.findByPk(taskId)
    if (!task) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }
    return await this.cmodel.update(payload, {
      where: {
        id: taskId,
      },
    })
  }

  /**
   * 删除任务
   * @param taskId 任务ID
   * @todo 增加权限控制
   */
  public async delete(taskId: number): Promise<any> {
    const { ctx } = this
    const task = await this.cmodel.findByPk(taskId)
    if (!task) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }

    // 删除任务统计

    // 更新用户统计
    this.countService.decrement({
      type: 'user',
      target_id: this.currentUserId,
      key: 'task_created',
    })

    return await this.cmodel.destroy({
      where: {
        id: taskId,
      },
    })
  }

  private async updateCount(data: any[]): Promise<any[]> {
    if (data) {
      const len = data.length
      for (let index = 0; index < len; index++) {
        const item = data[index]
        const count = await this.countService.getTaskCount(item.getDataValue('id'))
        item.setDataValue('count', count)
      }
    }
    return data
  }
}

export default TaskService
