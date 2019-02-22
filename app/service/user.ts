/**
 * User Service
 */
import { Context, IHelper } from 'egg'
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

  public cmodel: any
  private helper: IHelper

  constructor(ctx: Context) {
    super(ctx)
    this.cmodel = ctx.model.User
    this.helper = ctx.helper
  }

  /**
   * 根据ID获取用户
   * @param userId 用户ID
   */
  public async show(userId: string) {
    const { ctx } = this
    const user = await this.cmodel.findByPk(userId)
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }
    return user
  }

  /**
   * 添加用户
   * @param payload 用户信息
   */
  public async create(payload: any) {
    return await this.cmodel.create(payload)
  }

  /**
   * 更新用户
   * @param userId 用户ID
   * @param payload 用户信息
   */
  public async update(userId: number, payload: IUserItem) {
    const { ctx } = this
    const user = await this.cmodel.findByPk(userId)
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }
    return await this.cmodel.update(payload, {
      where: {
        id: userId,
      },
    })
  }

  /**
   * 根据ID获取用户
   * @param userId 用户ID
   */
  public async findById(userId: number) {
    const { ctx } = this
    const user = await this.cmodel.findByPk(userId)
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }

    // 关联用户统计信息
    const count = await this.countService.getTaskCount(user.getDataValue('id'))
    user.setDataValue('count', count)

    return this.helper.filterUser(user.dataValues)
  }

  /**
   * 根据手机号获取用户
   * @param mobile 手机号
   */
  public async findByMobile(mobile: string) {
    return await this.cmodel.findOne({
      where: { mobile },
    })
  }

  /**
   * 删除用户
   * @param id 用户ID
   */
  public async destroy(id: string) {
    const { ctx } = this
    const user = await this.cmodel.findByPk(id)
    if (!user) {
      ctx.throw(404, ctx.__('Common_item_not_found'))
    }
    return await this.cmodel.destroy({
      where: { id },
    })
  }

  /**
   * 用户信息
   */
  public async profile(): Promise<IUserItem> {
    const user = await this.cmodel.findByPk(this.currentUserId)
    return this.helper.filterUser(user.dataValues)
  }
}

export default UserService
