// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/controller/auth';
import ExportBase from '../../../app/controller/base';
import ExportCount from '../../../app/controller/count';
import ExportHome from '../../../app/controller/home';
import ExportOss from '../../../app/controller/oss';
import ExportResource from '../../../app/controller/resource';
import ExportTask from '../../../app/controller/task';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    base: ExportBase;
    count: ExportCount;
    home: ExportHome;
    oss: ExportOss;
    resource: ExportResource;
    task: ExportTask;
    user: ExportUser;
  }
}
