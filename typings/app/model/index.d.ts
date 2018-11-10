// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Model from '../../../app/model/model';
import User from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Model: ReturnType<typeof Model>;
    User: ReturnType<typeof User>;
  }
}
