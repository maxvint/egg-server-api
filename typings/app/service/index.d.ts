// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Auth from '../../../app/service/auth';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    auth: Auth;
    user: User;
  }
}
