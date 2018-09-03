// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Auth from '../../../app/service/auth';
import Node from '../../../app/service/node';
import Test from '../../../app/service/test';
import Topic from '../../../app/service/topic';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    auth: Auth;
    node: Node;
    test: Test;
    topic: Topic;
    user: User;
  }
}
