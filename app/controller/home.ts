import { Controller } from 'egg'

class HomeController extends Controller {
  public async index() {
    const { ctx } = this
    ctx.body = await ctx.service.test.sayHi('egg')
  }
}

export default HomeController
