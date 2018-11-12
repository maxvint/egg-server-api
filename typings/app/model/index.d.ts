// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Model from '../../../app/model/model';
import Temp from '../../../app/model/temp';
import User from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Model: ReturnType<typeof Model>;
    Temp: ReturnType<typeof Temp>;
    User: ReturnType<typeof User>;
  }
}
