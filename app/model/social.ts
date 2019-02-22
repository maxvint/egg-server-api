import { Application } from 'egg'

export default (app: Application) => {
  const { INTEGER, STRING, TINYINT } = app.Sequelize

  const Social = app.model.define('Social', {
    user_id: {
      type: INTEGER,
    },
    open_id: {
      type: STRING,
      comment: '微信使用unionid',
    },
    gravatar: {
      type: STRING,
    },
    name: {
      type: STRING,
    },
    type: {
      type: TINYINT,
      comment: '1-QQ，2-微信，3-微博',
      get() {
        return Number((this as any).getDataValue('type'))
      },
    },
  }, {
    tableName: 'social',
    paranoid: true,
  })

  return Social
}
