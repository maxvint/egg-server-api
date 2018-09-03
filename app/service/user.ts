/**
 * User Service
 */

import { Service } from 'egg';

export interface UserItem {
  _id: string;
  mobile: string;
  name: string;
  password: string;
  avatar: string;
  profile: object;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export default class User extends Service {

  private userFilter: string[];

  constructor(ctx) {
    super(ctx);

    this.userFilter = [ 'avatar', 'createdAt', 'profile', 'extra' ];
  }

  public async index() {
    const { ctx } = this;
    const res = await ctx.model.User
      .find({}, this.userFilter)
      .sort({ createdAt: -1 })
      .exec();
    return res;
  }

  public async create(payload: any) {
    const { ctx } = this;
    payload.password = await ctx.genHash(payload.password);
    return await ctx.model.User.create(payload);
  }

  public async destroy(_id: string) {
    const { ctx } = this;
    const user = await this.findById(_id);
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'));
    }
    return await ctx.model.User.findByIdAndDelete(_id);
  }

  public async show(_id: string) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(_id, this.userFilter);
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'));
    }
    return user;
  }

  public async update(_id: string, payload: UserItem): Promise<UserItem> {
    const { ctx } = this;
    const user = await this.findById(_id);
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'));
    }
    payload.updatedAt = new Date();
    return await ctx.model.User.findByIdAndUpdate(_id, payload);
  }

  public async profile() {
    const { ctx } = this;
    const { info: { _id: userId } } = ctx.state.user;
    return await this.ctx.model.User.findById(userId, this.userFilter);
  }

  public async findById(_id: string): Promise<UserItem> {
    return await this.ctx.model.User.findById(_id);
  }

  public async findByMobile(mobile: string): Promise<UserItem> {
    return await this.ctx.model.User.findOne({mobile});
  }

  public async findByIdAndUpdate(_id: string, values: UserItem) {
    return await this.ctx.model.User.findByIdAndUpdate(_id, values);
  }
}
