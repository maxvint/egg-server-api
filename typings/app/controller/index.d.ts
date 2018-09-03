// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Auth from '../../../app/controller/auth';
import Home from '../../../app/controller/home';
import Node from '../../../app/controller/node';
import Topic from '../../../app/controller/topic';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    auth: Auth;
    home: Home;
    node: Node;
    topic: Topic;
    user: User;
  }
}
