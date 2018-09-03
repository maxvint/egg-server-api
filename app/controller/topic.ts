import { Controller } from 'egg';

export default class TopicController extends Controller {

  private topicCreateTransfer: object;

  constructor(ctx) {
    super(ctx);

    this.topicCreateTransfer = {
      title: {type: 'string', required: true, allowEmpty: false},
    };
  }

  public async index() {
    const { ctx, service } = this;
    const res = await service.topic.index();
    ctx.helper.success({ ctx, code: 1, data: res });
  }

  public async create() {
    const { ctx, service } = this;
    ctx.validate(this.topicCreateTransfer, null);
    const payload = ctx.request.body || {};
    const topic = await service.topic.create(payload);
    ctx.helper.success({ ctx, code: 1, data: topic });
  }

  public async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const topic = await service.topic.update(id, payload);
    ctx.helper.success({ ctx, code: 1, data: topic });
  }

  public async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const topic = await service.topic.show(id);
    ctx.helper.success({ ctx, code: 1, data: topic });
  }
}
