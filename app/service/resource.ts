/**
 * Resource Service
 */
import { Context } from 'egg'
import BaseService from './base'

class ResourceService extends BaseService {

  public cmodel: any

  constructor(ctx: Context) {
    super(ctx)

    this.cmodel = ctx.model.Resource
    this.countService = this.ctx.service.count
  }

  /**
   * 获取数据列表
   * @param params 数据分页请求参数
   * @param userId 当前用户UID
   * @todo 增加权限控
   */
  public async list(params: IPageParams): Promise<any> {
    // 关联数据发布者、数据参与者、是否参与数据信息
    const include = [
      {
        model: this.ctx.model.User as any,
        as: 'creator',
        attributes: [ 'id', 'gravatar', 'nickname' ],
        required: true,
      },
    ]

    params.include = include
    params.order = [[ 'created_at', 'desc' ]]

    return await this.page(params)
  }

  /**
   * 获取数据详情
   * @param resourceId 数据ID
   * @param userId 用户UID
   * @todo 增加权限控制
   */
  public async show(resourceId: number): Promise<any> {
    const { ctx } = this
    const include = [
      {
        model: this.ctx.model.User as any,
        as: 'creator',
        attributes: [ 'id', 'gravatar', 'nickname' ],
        required: true,
      },
      {
        model: this.ctx.model.Task as any,
        as: 'task',
        required: true,
      },
    ]
    const conditions = {
      where: {
        id: resourceId,
      },
      include,
    }
    const resource = await this.cmodel.findOne(conditions)

    if (!resource) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }

    return resource
  }

  /**
   * 创建数据
   * @param payload 数据信息
   */
  public async create(payload: any): Promise<any> {
    const { ctx } = this
    const resource = await this.cmodel.create(payload)
    if (!resource) {
      ctx.throw(404, ctx.__('Common_item_create_error'))
    }
    // 更新统计
    this.countService.increment({
      type: 'task',
      target_id: resource.getDataValue('task_id'),
      key: 'resource_total',
    })
    return resource
  }

  /**
   * 更新数据
   * @param resourceId 数据ID
   * @param payload 更新内容
   * @todo 增加权限控制
   */
  public async update(resourceId: number, payload: any): Promise<any> {
    const { ctx } = this
    const resource = await this.cmodel.findByPk(resourceId)
    if (!resource) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }
    return await this.cmodel.update(payload, {
      where: {
        id: resourceId,
      },
    })
  }

  /**
   * 删除数据
   * @param resourceId 数据ID
   * @todo 增加权限控制
   */
  public async delete(resourceId: number): Promise<any> {
    const { ctx } = this
    const resource = await this.cmodel.findByPk(resourceId)
    if (!resource) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }
    const res = await this.cmodel.destroy({
      where: {
        id: resourceId,
      },
    })
    if (!res) {
      ctx.throw(404, ctx.__('Common_item_delete_error'))
    }
    // 更新统计
    this.countService.decrement({
      type: 'task',
      target_id: resource.getDataValue('task_id'),
      key: 'resource_total',
    })
    return res
  }
}

export default ResourceService
