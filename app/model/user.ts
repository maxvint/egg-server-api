import { Application } from 'egg'
import {
  md5,
  formatMobile,
  generateRadomStr,
} from '../extend/helper'

export default (app: Application) => {
  const { DATE, STRING, TINYINT } = app.Sequelize

  const User = app.model.define('User', {
    open_id: {
      type: STRING(255),
      comment: 'openid',
    },
    username: {
      type: STRING(255),
    },
    nickname: {
      type: STRING(255),
    },
    mobile: {
      type: STRING(255),
      get() {
        return (this as any).getDataValue('mobile') ? formatMobile((this as any).getDataValue('mobile')) : 0
      },
    },
    password: {
      type: STRING(255),
      set(val: string) {
        (this as any).setDataValue('password', md5(val))
      },
    },
    gravatar: {
      type: STRING(255),
    },
    is_finish_guide_task: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '是否完成新手任务标志',
    },
    qq: {
      type: STRING,
    },
    email: {
      type: STRING,
    },
    introduction: {
      type: STRING,
      defaultValue: '他很懒，什么也没有留下',
      comment: '用户介绍',
    },
    gender: {
      type: TINYINT,
      defaultValue: 0,
      comment: '0-保密，1-男，2-女',
      get() {
        return Number((this as any).getDataValue('gender'))
      },
    },
    role: {
      type: TINYINT(1),
      defaultValue: 0,
      comment: '用户角色，0-标注人员，1-企业人员',
      get() {
        return Number((this as any).getDataValue('role'))
      },
    },
    skills: {
      type: STRING(255),
      defaultValue: null,
      comment: '关联的技能tag',
    },
    invite_code: {
      type: STRING(10),
      defaultValue: null,
      comment: '新用户生成专属邀请码',
      set() {
        (this as any).setDataValue('invite_code', generateRadomStr(5))
      },
    },
    remark: {
      type: STRING(255),
    },
    last_logined_at: {
      type: DATE,
    },
    x_status: {
      type: TINYINT(1),
      allowNull: true,
      defaultValue: 1,
      comment: '状态',
    },
  }, {
    tableName: 'user',
    paranoid: true,
  })

  return User
}
