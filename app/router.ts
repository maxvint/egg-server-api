import { Application } from 'egg'

export default (app: Application) => {
  const VERSION = app.config.app.apiVersion
  const { controller, router } = app
  const userInterceptor = app.middleware.userInterceptor(app)
  const userAuth = app.middleware.userAuth()

  router.get('/', controller.home.index)

  // auth
  router.post(`/${VERSION}/auth/sign-in`, controller.auth.signIn)
  router.post(`/${VERSION}/auth/sign-up`, controller.auth.signUp)
  router.get(`/${VERSION}/auth/logout`, userInterceptor, controller.auth.logout)

  // count
  router.get(`/${VERSION}/count/:type/:target_id/:key`, userInterceptor, controller.count.show)

  // oss
  router.get(`/${VERSION}/oss/uptoken`, controller.oss.getPublicOSSUptoken)
  router.get(`/${VERSION}/oss/uptoken/task/:taskId`, userInterceptor, controller.oss.getTaskOSSUptoken)
  router.get(`/${VERSION}/oss/uptoken/tool/:tool_id`, userInterceptor, controller.oss.getToolOSSUptoken)
  router.post('/oss/upload_callback', controller.oss.uploadCallback)

  // resource
  router.get(`/${VERSION}/resources`, userAuth, controller.resource.list)
  router.get(`/${VERSION}/resource/:resourceId`, userAuth, controller.resource.show)
  router.post(`/${VERSION}/resource`, userInterceptor, controller.resource.create)
  router.put(`/${VERSION}/resource/:resourceId`, userInterceptor, controller.resource.update)
  router.delete(`/${VERSION}/resource/:resourceId`, userInterceptor, controller.resource.delete)

  // task
  router.get(`/${VERSION}/tasks`, userAuth, controller.task.list)
  router.get(`/${VERSION}/task/:taskId`, userAuth, controller.task.show)
  router.post(`/${VERSION}/task`, userInterceptor, controller.task.create)
  router.put(`/${VERSION}/task/:taskId`, userInterceptor, controller.task.update)
  router.delete(`/${VERSION}/task/:taskId`, userInterceptor, controller.task.delete)

  router.get(`/${VERSION}/task/:taskId/resources`, userAuth, controller.task.list)

  // user
  router.get(`/${VERSION}/user`, userInterceptor, controller.user.show)
  router.put(`/${VERSION}/user`, userInterceptor, controller.user.update)

  // user task resources
  // action: created | marked | checked
  router.get(`/${VERSION}/user/task/:taskId/resources/:action`, userInterceptor, controller.user.resources)
}
