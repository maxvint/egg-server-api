import { Application } from 'egg'
import * as OSS from 'ali-oss'

export default (app: Application) => {
  const { DATE, INTEGER, STRING, TEXT, TINYINT } = app.Sequelize

  const generatePrivateUrl = (key: string) => {
    const { oss } = app.config
    const ossParams = oss.private
    const client = new OSS({
      region: ossParams.region,
      accessKeyId: ossParams.keyId,
      accessKeySecret: ossParams.keySecret,
      bucket: ossParams.bucket,
    })
    try {
      return client.signatureUrl(key, {
        expires: ossParams.expire,
      })
    } catch (e) {
      return 'error private url'
    }
  }

  const Resource = app.model.define('Resource', {
    user_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    task_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    tool_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '直接关联工具时默认为样例数据',
    },
    resource_mark_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    resource_check_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    marker_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '最近标注人员',
    },
    marked_at: {
      type: DATE,
      defaultValue: null,
      comment: '最近标注时间',
    },
    checker_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '最近质检人员',
    },
    checked_at: {
      type: DATE,
      defaultValue: null,
      comment: '最近质检时间',
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    path: {
      type: STRING,
      get() {
        const path = (this as any).getDataValue('path')
        if (!path) {
          return ''
        }
        if ((path.indexOf('http://') >= 0) ||
          (path.indexOf('https://') >= 0)) {
          return (this as any).getDataValue('path')
        }
        if ((this as any).getDataValue('task_id')) {
          return generatePrivateUrl((this as any).getDataValue('path'))
        } else {
          return 'http://markartisan-public-resource.oss-cn-beijing.aliyuncs.com/' + (this as any).getDataValue('path')
        }
      },
    },
    info: {
      type: TEXT,
    },
    ext_info: {
      type: TEXT,
      comment: '外部信息，导入前统一处理为json字符串',
      get() {
        if (!(this as any).getDataValue('ext_info')) {
          return null
        }
        try {
          return JSON.parse((this as any).getDataValue('ext_info'))
        } catch (e) {
          return (this as any).getDataValue('ext_info')
        }
      },
      set(val: string) {
        if (val) {
          (this as any).setDataValue('ext_info', val)
        }
      },
    },
    category: {
      type: TINYINT,
      defaultValue: 0,
      get() {
        return Number((this as any).getDataValue('category'))
      },
    },
    is_check_sample: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '是否被抽样质检',
    },
    status: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '资源状态，1-完成，0-待检验，-1-标记异常(检验失败)',
      get() {
        return Number((this as any).getDataValue('status'))
      },
    },
    pay_status: {
      type: TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '状态：0-待支付，1-已启动（已支付），2-已结束，需要支付后才能启动',
      get() {
        return Number((this as any).getDataValue('pay_status'))
      },
    },
    x_status: {
      type: TINYINT(1),
      allowNull: true,
      defaultValue: 1,
      comment: '状态',
    },
  }, {
    tableName: 'resource',
    paranoid: true,
  })

  Resource.associate = () => {
    Resource.belongsTo(app.model.User, {
      as: 'creator',
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    })
    Resource.belongsTo(app.model.Task, {
      as: 'task',
      foreignKey: 'task_id',
      onDelete: 'CASCADE',
    })
  }

  return Resource
}
