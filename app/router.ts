import { Application } from 'egg';

export default (app: Application) => {
  const VERSION = 'v1';
  const { controller, router } = app;
  const userInterceptor = app.middleware.userInterceptor(app);

  router.get('/', controller.home.index);

  // auth
  router.post(`/${VERSION}/auth/sign-in`, controller.auth.signIn);
  router.post(`/${VERSION}/auth/sign-up`, controller.auth.signUp);

  // user
  // router.resources('user', `/${VERSION}/user`, controller.user);
  router.get(`/${VERSION}/users`, controller.user.index);
  router.get(`/${VERSION}/user/logout`, userInterceptor, controller.user.logout);
  router.get(`/${VERSION}/user/profile`, userInterceptor, controller.user.profile);
  router.get(`/${VERSION}/user/:id`, controller.user.show);
  router.put(`/${VERSION}/user/:id`, controller.user.update);
  router.get(`/${VERSION}/user/:id/reply`, controller.user.reply);
  router.get(`/${VERSION}/user/:id/topics`, controller.user.topics);
  router.get(`/${VERSION}/user/:id/following`, controller.user.following);
  router.get(`/${VERSION}/user/:id/followers`, controller.user.followers);
  router.get(`/${VERSION}/user/:id/favorites`, controller.user.favorites);

  // like

  // node

  // notification

  // photo

  // reply

  // topic
};
