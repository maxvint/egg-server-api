import { Context } from 'egg'
import BaseController from './base'

class UserController extends BaseController {

  private userUpdateTransfer: IUserUpdateTransfer

  constructor(ctx: Context) {
    super(ctx)

    this.userUpdateTransfer = {
      nickname: { type: 'string', required: true, allowEmpty: false },
      qq: { type: 'string', required: true, allowEmpty: false },
      email: { type: 'string', required: true, allowEmpty: false },
      introduction: { type: 'string', required: true, allowEmpty: false },
    }
  }

  /**
   * 用户详情
   */
  public async show() {
    const { service } = this
    const res = await service.user.findById(this.currentUserId)
    this.success({ code: 1, data: res })
  }

  /**
   * 更新用户
   */
  public async update() {
    const { ctx, service } = this
    const payload = ctx.request.body
    ctx.validate(this.userUpdateTransfer, payload)
    const res = await service.user.update(this.currentUserId, payload)
    this.success({ code: 1, data: res })
  }

  /**
   * 用户创建 | 标注 | 质检的数据
   */
  public async resources() {
    const { ctx, service } = this
    const { taskId, action } = ctx.params
    const { keyword, status } = ctx.query
    let conditions: any = {}

    switch (action) {
      case 'created':
        conditions = {
          task_id: taskId,
          user_id: this.currentUserId,
        }
        break

      case 'marked':
        conditions = {
          task_id: taskId,
          marker_id: this.currentUserId,
        }
        break

      case 'checked':
        conditions = {
          task_id: taskId,
          checker_id: this.currentUserId,
        }
        break

      default:
        break
    }

    // 处理过滤条件
    if (status) {
      conditions.status = status
    }
    if (keyword) {
      conditions.title = {
        $like: `%${keyword}%`,
      }
    }

    const { data, pagination } = await service.resource.list({
      conditions,
    })
    this.page(data, pagination)
  }
}

export default UserController
