import BaseController from './base'

class UserController extends BaseController {

  private userUpdateTransfer: IUserTransfer

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
    this.success({ code: 1, data: res })
  }

  public async create() {
    const { ctx, service } = this
    const payload = ctx.request.body
    ctx.validate(this.userUpdateTransfer, payload)
    const res = await service.user.create(payload)
    this.success({ code: 1, data: res })
  }

  public async update() {
    const { ctx, service } = this
    const { id } = ctx.params
    const payload = ctx.request.body
    ctx.validate(this.userUpdateTransfer, payload)
    const res = await service.user.update(id, payload)
    this.success({ code: 1, data: res })
  }

  public async destroy() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.user.destroy(id)
    this.success({ code: 1, data: res })
  }
}

export default UserController
