import { Controller } from 'egg';

export default class UserController extends Controller {

  constructor(ctx) {
    super(ctx);
  }

  public async index() {
    const { ctx, service } = this;
    const res = await service.user.index();
    ctx.helper.success({ ctx, code: 1, data: res });
  }

  public async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.show(id);
    ctx.helper.success({ ctx, code: 1, data: res });
  }

  public async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    await service.user.update(id, payload);
    ctx.helper.success({ ctx });
  }

  public async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.destroy(id);
    ctx.helper.success({ ctx });
  }

  public async logout() {}

  public async profile() {}
}
