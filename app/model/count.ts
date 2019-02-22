import { Application } from 'egg'

export default (app: Application) => {
  const { INTEGER, STRING, TEXT, TINYINT } = app.Sequelize

  const Count = app.model.define('Count', {
    target_id: {
      type: INTEGER(10),
      allowNull: false,
      comment: '关联的数据ID',
    },
    type: {
      type: STRING(10),
      allowNull: false,
      comment: '类型 task | task_join | resource | user',
    },
    key: {
      type: STRING(40),
      allowNull: false,
      comment: '统计名称',
    },
    value: {
      type: TEXT,
      allowNull: true,
      defaultValue: '0',
      comment: '统计值',
    },
    x_status: {
      type: TINYINT(1),
      allowNull: true,
      defaultValue: 1,
      comment: '状态',
    },
  }, {
    tableName: 'count',
    paranoid: true,
  })

  return Count
}
