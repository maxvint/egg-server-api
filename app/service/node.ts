import { Service } from 'egg';

export interface NodeItem {
  _id: string;
  name: string;
  summary: string;
  sort: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

/**
 * Node Service
 */
export default class Node extends Service {

  public async index() {
    const { ctx } = this;
    const res = await ctx.model.Node
      .find({})
      .sort({ createdAt: -1 })
      .exec();
    return res;
  }

  /**
   * create
   */
  public async create(payload: any) {
    const { ctx } = this;
    return await ctx.model.Node.create(payload);
  }

  public async show(_id: string) {
    const { ctx } = this;
    const node = await ctx.model.Node.findById(_id);
    if (!node) {
      ctx.throw(404, ctx.__('Common_item_not_found'));
    }
    return node;
  }
}
