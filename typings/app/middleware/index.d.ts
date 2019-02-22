// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler from '../../../app/middleware/errorHandler';
import ExportUserAuth from '../../../app/middleware/userAuth';
import ExportUserInterceptor from '../../../app/middleware/userInterceptor';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    userAuth: typeof ExportUserAuth;
    userInterceptor: typeof ExportUserInterceptor;
  }
}
