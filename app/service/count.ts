import { Context, Service } from 'egg'

/**
 * Count Service
 */
class CountService extends Service {

  public cmodel: any

  constructor(ctx: Context) {
    super(ctx)

    this.cmodel = ctx.model.Count
  }

  /**
   * 根据key获取统计记录
   * @param payload
   */
  public async findByKey(type: CountType, targetId: number, key: string): Promise<any> {
    const res = await this.cmodel.findOne({
      where: {
        type,
        target_id: targetId,
        key,
      },
    })
    return res
  }

  public async getTaskCount(taskId: number): Promise<any> {
    const countAttributes = [
      'marker',
      'checker',
      'resource_total',
      'resource_marked',
      'resource_mark_passed',
      'resource_checked',
      'resource_check_passed',
      'resource_mark_object',
    ]
    const data = await this.cmodel.findAll({
      where: {
        target_id: taskId,
        key: {
          $in: countAttributes,
        },
      },
    })
    return data.reduce((acc: any, current: any) => {
      acc[current.getDataValue('key')] = current.getDataValue('value')
      return acc
    }, {})
  }

  /**
   * 更新统计
   * @param payload
   */
  public async update(payload: any): Promise<any> {
    const { type, key, target_id: targetId } = payload
    const item = await this.findByKey(type, targetId, key)
    if (!item) {
      // 插入新记录
      return await this.cmodel.create(payload)
    }
    return await this.cmodel.update(payload, {
      where: {
        id: payload.id,
      },
    })
  }

  /**
   * 自增
   */
  public async increment(payload: any): Promise<any> {
    const { type, key, target_id: targetId } = payload
    const item = await this.findByKey(type, targetId, key)
    if (!item) {
      // 插入新记录
      return await this.cmodel.create(payload)
    }
    return await item.increment('value')
  }

  /**
   * 自减
   */
  public async decrement(payload: any): Promise<any> {
    const { type, key, target_id: targetId } = payload
    const item = await this.findByKey(type, targetId, key)
    if (!item) {
      // 插入新记录
      return await this.cmodel.create(payload)
    }
    return await item.decrement('value')
  }
}

export default CountService
