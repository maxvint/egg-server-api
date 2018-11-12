import { Application } from 'egg'

export default (app: Application) => {
  const VERSION = 'v1'
  const { controller, router } = app
  const userInterceptor = app.middleware.userInterceptor(app)

  router.get('/', controller.home.index)

  // auth
  router.post(`/${VERSION}/auth/sign-in`, controller.auth.signIn)
  router.post(`/${VERSION}/auth/sign-up`, controller.auth.signUp)
  router.get(`/${VERSION}/auth/logout`, userInterceptor, controller.auth.logout)

  // user
  // router.resources('user', `/${VERSION}/user`, controller.user)
  router.get(`/${VERSION}/users`, controller.user.list)
  router.get(`/${VERSION}/user/profile`, userInterceptor, controller.user.profile)
  router.get(`/${VERSION}/user/:id`, controller.user.show)
  router.put(`/${VERSION}/user/:id`, controller.user.update)

  // topic
  // router.get(`/${VERSION}/topics`, controller.topic.index)
  // router.get(`/${VERSION}/topic/:id`, controller.topic.show)
  // router.post(`/${VERSION}/topic`, userInterceptor, controller.topic.create)
  // router.put(`/${VERSION}/topic`, userInterceptor, controller.topic.update)
}
