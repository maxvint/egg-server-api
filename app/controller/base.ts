import { Context, Controller } from 'egg'

class BaseController extends Controller {

  public currentUserId: number

  constructor(ctx: Context) {
    super(ctx)

    this.currentUserId = ctx.user.id || 0
  }

  get pageParams() {
    return {
      per_page: this.ctx.query.per_page || 10,
      page: this.ctx.query.page || 1,
    }
  }

  /**
   * 输出成功响应
   * @param param
   */
  success({ code = 1, data = null, message = 'success' }: ISucessResponse) {
    this.ctx.body = {
      code,
      data,
      message,
    }
    this.ctx.status = 200
  }

  /**
   * 输出分页列表
   * @param data 数据
   * @param pagination 分页信息
   * @param message 响应结果
   * @param code 标识码
   */
  page(
    data: string = '',
    pagination: object = {},
    message: string = 'success',
    code: number = 1,
  ) {
    this.ctx.body = {
      data,
      code,
      message,
      pagination,
    }
  }

  /**
   * 输出404响应
   * @param message
   */
  notFound(message: string) {
    message = message || 'not found'
    this.ctx.throw(404, message)
  }
}

export default BaseController
