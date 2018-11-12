/**
 * User Service
 */

import BaseService from './base'

export interface IUserItem {
  id: string
  mobile: string
  name: string
  password: string
  avatar: string
  profile: object
  created_at: Date
  updated_at: Date
  deleted_at: Date
}

class UserService extends BaseService {

  public cmodel

  constructor(ctx) {
    super(ctx)
    this.cmodel = ctx.model.User
  }

  public async list() {
    return await this.page()
  }

  public async create(payload: any) {
    return await this.cmodel.create(payload)
  }

  public async update(id, payload: IUserItem) {
    const { ctx } = this
    const user = await ctx.model.User.findById(id)
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }
    return await ctx.model.User.update(payload)
  }

  public async findById(id: string) {
    const { ctx } = this
    const user = await ctx.model.User.findById(id)
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }
    return user
  }

  public async findByMobile(mobile: string) {
    const { ctx } = this
    return await ctx.model.User.findOne({
      where: { mobile },
    })
  }

  public async destroy(id: string) {
    const { ctx } = this
    const user = await ctx.model.User.findById(id)
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }
    // return await ctx.model.User.findByIdAndDelete(id)
  }

  public async profile() {
    const { ctx } = this
    const { info: { id: userId } } = ctx.state.user
    return await ctx.model.User.findById(userId)
  }

  /*
  public async findByIdAndUpdate(id: string, values: IUserItem) {
    const { ctx } = this
    return await ctx.model.User.findByIdAndUpdate(id, values)
  }
  */
}

export default UserService
