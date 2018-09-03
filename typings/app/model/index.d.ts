// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Node from '../../../app/model/node';
import Topic from '../../../app/model/topic';
import User from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Node: ReturnType<typeof Node>;
    Topic: ReturnType<typeof Topic>;
    User: ReturnType<typeof User>;
  }
}
