// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Auth from '../../../app/service/auth';
import Base from '../../../app/service/base';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    auth: Auth;
    base: Base;
    user: User;
  }
}
