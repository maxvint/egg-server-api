// 用户外键
// uid: String,
// 商品外键
// gid: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Good'
// },
// 浏览时间
// date: String

// import { Application } from 'egg'
// import * as Sequelize from 'sequelize'

// export interface AppAttributes {
//   id: number
//   title: string
//   appid: string
//   secret: string
// }

// export interface AppInstance extends Sequelize.Instance<AppAttributes>, AppAttributes {
// }

import { Application } from 'egg'
import { createBcrypt, formatMobile } from '../extend/helper'
import BaseModel from './model'

/*
interface IUserAttributes {
  mobile: string
  name: string
  password: string
  avatar: string
  profile: string
  deleted_at: string
  created_at: string
  updated_at: string
}

interface IUserInstance extends Instance<IUserAttributes>, IUserAttributes {}

interface IUserModel extends Model<IUserInstance, IUserAttributes> {
  findByMobile(mobile: string): void
}
*/

export default (app: Application) => {
  const { STRING } = app.Sequelize

  const User = BaseModel(app, 'User', {
    mobile: {
      type: STRING(20),
      unique: true,
      // required: true,
      comment: '手机号',
    },
    name: {
      type: STRING(32),
      comment: '姓名',
    },
    password: {
      type: STRING(255),
      // required: true,
      comment: '密码',
    },
    avatar: {
      type: STRING(255),
      // default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm',
      comment: '头像',
    },
    profile: {
      type: STRING(255),
      comment: '简介',
    },
  }, {
    // defaultScope: {
      // attributes: { exclude: ['password'] },
    // },
    // 修改器
    getterMethods: {
      mobile() {
        return formatMobile((this as any).getDataValue('mobile'))
      },
    },
    setterMethods: {
      password(value: string) {
        // 加密密码
        (this as any).setDataValue('password', createBcrypt(value))
      },
    },
  })

  // User.hidden = (): string[] => {
  //   return [
  //     'password',
  //   ]
  // }

  // User.associate = () => {
  //   app.model.User.belongsTo(app.model.Profile, { as: 'user' })
  // }

  return User
}
