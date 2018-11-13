import { Application } from 'egg'
import { createBcrypt, formatMobile } from '../extend/helper'
import BaseModel from './model'

export default (app: Application) => {
  const { STRING } = app.Sequelize

  const User = BaseModel(app, 'user', {
    mobile: {
      type: STRING(20),
      unique: true,
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
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      scopes: {
        password: {
          attributes: {
            include: ['password'],
          },
        },
      },
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

  // User.associate = () => {
  //   app.model.User.belongsTo(app.model.Profile, { as: 'user' })
  // }

  return User
}
