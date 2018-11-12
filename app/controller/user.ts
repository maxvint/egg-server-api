import BaseController from './base'

class UserController extends BaseController {

  constructor(ctx) {
    super(ctx)
  }

  public async list() {
    const { service } = this
    const { data, pagination } = await service.user.list()
    this.page(data, pagination)
  }

  public async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.user.findById(id)
    ctx.helper.success({ ctx, code: 1, data: res })
  }

  public async update() {
    const { ctx, service } = this
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    await service.user.update(id, payload)
    ctx.helper.success({ ctx })
  }

  public async destroy() {
    const { ctx, service } = this
    const { id } = ctx.params
    await service.user.destroy(id)
    ctx.helper.success({ ctx })
  }

  public async profile() {
    const { ctx, service } = this
    const user = await service.user.profile()
    ctx.helper.success({ ctx, code: 1, data: user })
  }
}

export default UserController
