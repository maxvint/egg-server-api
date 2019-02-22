import { Controller, Context } from 'egg'

export default class AuthController extends Controller {

  private userSignInTransfer: ISignInTransfer
  private userSignUpTransfer: ISignUpTransfer

  constructor(ctx: Context) {
    super(ctx)

    this.userSignInTransfer = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
    }

    this.userSignUpTransfer = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
      code: { type: 'string', required: true, allowEmpty: false },
    }
  }

  /**
   * 登录
   */
  public async signIn() {
    const { ctx, service } = this
    ctx.validate(this.userSignInTransfer, null)
    const payload = ctx.request.body || {}
    const { code, data, message } = await service.auth.signIn(payload)
    ctx.helper.success({ ctx, code, data, message })
  }

  /**
   * 注册
   */
  public async signUp() {
    const { ctx, service } = this
    ctx.validate(this.userSignUpTransfer, null)
    const payload = ctx.request.body || {}
    const { code, data, message } = await service.auth.signUp(payload)
    ctx.helper.success({ ctx, code, data, message })
  }

  /**
   * 登出
   */
  public async logout() {
    const { ctx } = this
    ctx.helper.success({ ctx })
  }
}
