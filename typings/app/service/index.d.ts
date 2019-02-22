// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/service/auth';
import ExportBase from '../../../app/service/base';
import ExportCount from '../../../app/service/count';
import ExportOss from '../../../app/service/oss';
import ExportResource from '../../../app/service/resource';
import ExportSms from '../../../app/service/sms';
import ExportTask from '../../../app/service/task';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    auth: ExportAuth;
    base: ExportBase;
    count: ExportCount;
    oss: ExportOss;
    resource: ExportResource;
    sms: ExportSms;
    task: ExportTask;
    user: ExportUser;
  }
}
