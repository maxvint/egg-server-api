import { Service } from 'egg';

export interface TopicItem {
  _id: string;
  title: string;
  node: string;
  user: string;
  deleted: boolean;
  excellent: boolean;
  top: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Topic Service
 */
export default class Topic extends Service {

  public async index() {
    const { ctx } = this;
    const res = await ctx.model.Topic
      .find({})
      .sort({ top: -1, createdAt: -1 })
      .exec();
    return res;
  }

  /**
   * create
   */
  public async create(payload: any) {
    const { ctx } = this;
    return await ctx.model.Topic.create(payload);
  }

  public async update(_id: string, payload: TopicItem): Promise<TopicItem> {
    const { ctx } = this;
    const topic = await this.findById(_id);
    if (!topic) {
      ctx.throw(404, ctx.__('Common_item_not_found'));
    }
    payload.updatedAt = new Date();
    return await ctx.model.Topic.findByIdAndUpdate(_id, payload);
  }

  public async show(_id: string) {
    const { ctx } = this;
    const topic = await ctx.model.Topic.findById(_id);
    if (!topic) {
      ctx.throw(404, ctx.__('Common_item_not_found'));
    }
    return topic;
  }

  public async findById(_id: string): Promise<TopicItem> {
    return await this.ctx.model.Topic.findById(_id);
  }
}
