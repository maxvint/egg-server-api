import { Service } from 'egg'
// import { Model } from 'sequelize'

/**
 * Base Service
 */
class BaseService extends Service {

  public cmodel
  private pageParams: IPagination

  constructor(ctx) {
    super(ctx)

    this.cmodel = null
    this.pageParams = {
      page: Number(this.ctx.query.page) || 1,
      page_size: Number(this.ctx.query.page_size) || 10,
      total_page: 1,
      total_count: 0,
    }
  }

  // async findById(id) {
  // return await this.
  // }

  /**
   * 分页方法
   * @param  {Object} conditions [description]
   * @param  {Array} order [description]
   * @param  {Object} include [description]
   * @param  {Object} attributes [description]
   * @param  {[type]} group [description]
   * @return {[type]} [description]
   */
  async page(params = {
    model: null,
    conditions: {},
    order: [['id', 'desc']],
    include: [],
    attributes: {},
  }): Promise<{ data: any, pagination: IPagination }> {
    const { model, conditions, order, include } = params

    if (model) {
      this.cmodel = model
    }

    const { count, rows: data } = await this.cmodel.findAndCountAll({
      where: conditions,
      offset: (this.pageParams.page - 1) * this.pageParams.page_size,
      limit: this.pageParams.page_size,
      order,
      include,
    })

    this.pageParams.total_count = count
    this.pageParams.total_page = Math.ceil(count / this.pageParams.page_size)
    return { data, pagination: this.pageParams }
  }

}

export default BaseService
