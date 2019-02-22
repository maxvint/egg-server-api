import { Context, Service } from 'egg'
import CountService from './count'

/**
 * Base Service
 */
class BaseService extends Service {

  public cmodel: any
  public countService: CountService
  public currentUserId: number
  private pageParams: IPagination

  constructor(ctx: Context) {
    super(ctx)

    this.cmodel = null
    this.countService = this.service.count
    this.currentUserId = ctx.user.id || 0
    this.pageParams = {
      page: Number(this.ctx.query.page) || 1,
      page_size: Number(this.ctx.query.page_size) || 10,
      page_max: 1,
      total: 0,
    }
  }

  /**
   * 通用分页方法
   * @param  {Object} conditions [description]
   * @param  {Array} order [description]
   * @param  {Object} include [description]
   * @param  {Object} attributes [description]
   * @param  {[type]} group [description]
   * @return {[type]} [description]
   */
  async page(params: IPageParams = {
    model: null,
    conditions: {},
    order: [['id', 'desc']],
    include: [],
    attributes: [],
  }): Promise<{ data: any, pagination: IPagination }> {
    const { model, conditions, order, include } = params

    if (model) {
      this.cmodel = model
    }

    const total = await this.cmodel.count({
      where: conditions,
    })
    const data = await this.cmodel.findAll({
      where: conditions,
      offset: (this.pageParams.page - 1) * this.pageParams.page_size,
      limit: this.pageParams.page_size,
      include,
      order,
    })

    this.pageParams.total = total
    this.pageParams.page_max = Math.ceil(total / this.pageParams.page_size)
    return { data, pagination: this.pageParams }
  }
}

export default BaseService
