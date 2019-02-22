import { Controller } from 'egg'

class HomeController extends Controller {

  public async index() {
    const { ctx } = this
    ctx.body = 'Matuapi'
  }
}

export default HomeController
