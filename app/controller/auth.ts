import { Controller } from 'egg';

export default class AuthController extends Controller {

  private UserSignInTransfer: object;
  private UserSignUpTransfer: object;

  constructor(ctx) {
    super(ctx);

    this.UserSignInTransfer = {
      mobile: {type: 'string', required: true, allowEmpty: false},
      password: {type: 'string', required: true, allowEmpty: false}
    }

    this.UserSignUpTransfer = {
      mobile: {type: 'string', required: true, allowEmpty: false},
      password: {type: 'string', required: true, allowEmpty: false}
    }
  }

  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async signIn() {
    const {ctx, service} = this;
    // 校验参数
    ctx.validate(this.UserSignInTransfer, null);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用service进行业务处理
    await service.auth.signIn(payload);
  }

  public async signUp() {
    const {ctx, service} = this;
    // 校验参数
    ctx.validate(this.UserSignUpTransfer, null);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用service进行业务处理
    await service.auth.signUp(payload);
  }
}
