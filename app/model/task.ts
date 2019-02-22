import { Application } from 'egg'

export default (app: Application) => {
  const { DATE, DECIMAL, INTEGER, STRING, TEXT, TINYINT } = app.Sequelize

  const Task = app.model.define('Task', {
    user_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '用户ID',
    },
    tool_id: {
      type: INTEGER.UNSIGNED,
      defaultValue: 0,
      comment: '工具ID',
    },
    title: {
      type: STRING,
      allowNull: false,
      comment: '任务名称',
    },
    summary: {
      type: STRING,
      allowNull: true,
      comment: '任务简介',
    },
    thumb: {
      type: STRING,
      allowNull: true,
      comment: '任务缩略图',
    },
    tags: {
      type: STRING,
      defaultValue: null,
      comment: '任务标签',
    },
    number: {
      type: INTEGER.UNSIGNED,
      defaultValue: 0,
      comment: '任务编号',
    },
    type: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '任务分类：1-图像，2-视频，3-点云',
      get () {
        return Number((this as any).getDataValue('type'))
      },
    },
    category: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      get () {
        return Number((this as any).getDataValue('category'))
      },
    },
    content: {
      type: TEXT,
      allowNull: true,
      defaultValue: null,
    },
    duration: {
      type: STRING,
      defaultValue: null,
    },
    task_price: {
      type: DECIMAL(8, 2),
      defaultValue: 0,
      comment: '任务资源单价',
    },
    tool_price: {
      type: DECIMAL(8, 2),
      defaultValue: 0,
      comment: '资源工具单价',
    },
    tool_config: {
      type: STRING,
      defaultValue: null,
      get() {
        if (!(this as any).getDataValue('tool_config')) {
          return null
        }
        return JSON.parse((this as any).getDataValue('tool_config'))
      },
      set(val: string) {
        (this as any).setDataValue('tool_config', JSON.stringify(val))
      },
    },
    mark_config: {
      type: STRING,
      defaultValue: null,
      get() {
        if (!(this as any).getDataValue('mark_config')) {
          return null
        }
        return JSON.parse((this as any).getDataValue('mark_config'))
      },
      set(val: string) {
        (this as any).setDataValue('mark_config', JSON.stringify(val))
      },
    },
    check_config: {
      type: STRING,
      defaultValue: null,
      get() {
        if (!(this as any).getDataValue('check_config')) {
          return null
        }
        return JSON.parse((this as any).getDataValue('check_config'))
      },
      set(val: string) {
        (this as any).setDataValue('check_config', JSON.stringify(val))
      },
    },
    mark_info: {
      type: STRING,
      defaultValue: null,
    },
    check_info: {
      type: STRING,
      defaultValue: null,
    },
    x_status: {
      type: TINYINT(1),
      allowNull: true,
      defaultValue: 1,
      comment: '状态',
    },
    status: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 1,  // 任务需要支付后才能启动
      comment: '状态：0-待支付，1-已启动（已支付），2-已结束',
      get() {
        return Number((this as any).getDataValue('status'))
      },
    },
    started_at: {
      type: DATE,
      defaultValue: null,
    },
    ended_at: {
      type: DATE,
      defaultValue: null,
    },
  }, {
    tableName: 'task',
    paranoid: true,
  })

  Task.associate = () => {
    app.model.Task.belongsTo(app.model.User, {
      as: 'creator',
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    })
  }

  return Task
}
