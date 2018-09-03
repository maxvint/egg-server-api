import { Controller } from 'egg';

export default class NodeController extends Controller {

  private nodeCreateTransfer: object;

  constructor(ctx) {
    super(ctx);

    this.nodeCreateTransfer = {
      name: {type: 'string', required: true, allowEmpty: false},
    };
  }

  public async index() {
    const { ctx, service } = this;
    const res = await service.node.index();
    ctx.helper.success({ ctx, code: 1, data: res });
  }

  public async create() {
    const { ctx, service } = this;
    ctx.validate(this.nodeCreateTransfer, null);
    const payload = ctx.request.body || {};
    const res = await service.node.create(payload);
    ctx.helper.success({ ctx, code: 1, data: res });
  }

  public async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const node = await service.node.show(id);
    ctx.helper.success({ ctx, code: 1, data: node });
  }
}
