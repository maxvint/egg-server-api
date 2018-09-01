// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import ErrorHandler from '../../../app/middleware/errorHandler';
import UserInterceptor from '../../../app/middleware/userInterceptor';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ErrorHandler;
    userInterceptor: typeof UserInterceptor;
  }
}
