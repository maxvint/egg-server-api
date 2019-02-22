// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCount from '../../../app/model/count';
import ExportResource from '../../../app/model/resource';
import ExportSms from '../../../app/model/sms';
import ExportSocial from '../../../app/model/social';
import ExportTask from '../../../app/model/task';
import ExportUser from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Count: ReturnType<typeof ExportCount>;
    Resource: ReturnType<typeof ExportResource>;
    Sms: ReturnType<typeof ExportSms>;
    Social: ReturnType<typeof ExportSocial>;
    Task: ReturnType<typeof ExportTask>;
    User: ReturnType<typeof ExportUser>;
  }
}
