import { Controller } from 'egg'

class BaseController extends Controller {

  get user() {
    return this.ctx.session.user
  }

  get pageParams() {
    return {
      per_page: this.ctx.query.per_page || 10,
      page: this.ctx.query.page || 1,
    }
  }

  success({ code = 1, data = null, message = 'success' }) {
    this.ctx.body = {
      code,
      data,
      message,
    }
    this.ctx.status = 200
  }

  page(data = '', pagination = {}, message = 'success', code = 1) {
    this.ctx.body = {
      data,
      code,
      message,
      pagination,
    }
  }

  notFound(message) {
    message = message || 'not found'
    this.ctx.throw(404, message)
  }
}

export default BaseController
