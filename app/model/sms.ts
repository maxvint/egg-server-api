import { Application } from 'egg'

export default (app: Application) => {
  const { INTEGER, STRING, TEXT, TINYINT } = app.Sequelize

  const Sms = app.model.define('Sms', {
    user_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    temp_id: {
      type: STRING,
      allowNull: false,
      defaultValue: 0,
      comment: '短信模板ID',
    },
    mobile: {
      type: STRING,
      allowNull: false,
    },
    content: {
      type: STRING,
    },
    result_info: {
      type: TEXT,
      comment: '发送callback',
    },
    x_status: {
      type: TINYINT(1),
      allowNull: true,
      defaultValue: 1,
      comment: '状态',
    },
  }, {
    tableName: 'sms',
    paranoid: true,
  })

  return Sms
}
