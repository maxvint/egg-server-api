/**
 * User Service
 */

import { Service } from 'egg'

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

export default class User extends Service {

  constructor(ctx) {
    super(ctx)
  }

  public async index() {
    const { ctx } = this
    const res = await ctx.model.User.findAll()
    return res
  }

  public async create(payload: any) {
    const { ctx } = this
    return await ctx.model.User.create(payload)
  }

  public async update(id, payload: IUserItem) {
    const { ctx } = this
    const user = await ctx.model.User.findById(id)
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }
    return await ctx.model.User.update(payload)
  }

  public async show(id: string) {
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
