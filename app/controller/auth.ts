import { Controller } from 'egg'

export default class AuthController extends Controller {

  private userSignInTransfer: ISignInTransfer
  private userSignUpTransfer: ISignUpTransfer

  constructor(ctx) {
    super(ctx)

    this.userSignInTransfer = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
    }

    this.userSignUpTransfer = {
      mobile: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
    }
  }

  public async signIn() {
    const { ctx, service } = this
    ctx.validate(this.userSignInTransfer, null)
    const payload = ctx.request.body || {}
    await service.auth.signIn(payload)
  }

  public async signUp() {
    const { ctx, service } = this
    ctx.validate(this.userSignUpTransfer, null)
    const payload = ctx.request.body || {}
    await service.auth.signUp(payload)
  }

  public async logout() {
    const { ctx } = this
    ctx.helper.success({ ctx })
  }
}
