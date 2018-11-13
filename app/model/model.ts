import { Application } from 'egg'
import * as moment from 'moment'
import { DefineAttributes, SequelizeStatic } from 'sequelize'

const BaseModel = (
  app: Application,
  table: string,
  attributes: DefineAttributes,
  options: object = {}) => {

  const { UUID, UUIDV4 } = app.Sequelize

  const modelSchema = app.model.define(table, {
    id: {
      type: UUID, // UUID : mysql --- >chat(36) PostgreSQL --- > UUID
      unique: true, // 唯一索引
      primaryKey: true, // 主键
      allowNull: false,
      defaultValue: UUIDV4, // Sequelize 自动生成 v4 UUID
    },
    ...attributes,
    ...getDefaultAttributes(app.Sequelize),
  }, {
      // 自动维护时间戳 [ created_at、updated_at ]
      timestamps: true,
      // 不使用驼峰样式自动添加属性，而是下划线样式 [createdAt => created_at]
      // 禁止修改表名, 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
      underscored: true,
      // 开启软删除
      paranoid: true,
      freezeTableName: false,
      ...options,
      /*
      scopes: {
        // 定义全局作用域，使用方法如: .scope('onlyTrashed') or .scope('onlyTrashed1', 'onlyTrashed12') [ 多个作用域 ]
        onlyTrashed: {
          // 只查询软删除数据
          where: {
            deleted_at: {
              [Op.not]: null,
            },
          },
        },
      },
      */
    })

  /**
   * @returns {string[]} 获取定义的所有字段属性
   */
  modelSchema.getAttributes = (): string[] => {
    return Object.keys(attributes)
  }

  /**
   * @returns {string} 获取定义的指定字段属性的值
   */
  modelSchema.findAttribute = (attribute: string): object | undefined => {
    return (attributes as any)[attribute]
  }

  /**
   * @returns {array} 可批量赋值的数组,当为空时，会自动遍历 model 定义的字段属性来进行过滤
   */
  modelSchema.fillable = (): string[] => {
    return []
  }

  /**
   * @returns {array} 输出数据时，隐藏字段数组 [ 黑名单 ]
   */
  modelSchema.hidden = (): string[] => {
    return []
  }

  /**
   * @returns {array} 输出数据时显示的属性 [ 白名单 ]
   */
  modelSchema.visible = (): string[] => {
    return []
  }

  return modelSchema
}

const getDefaultAttributes = (sequelize: SequelizeStatic): object => {
  const { DATE } = sequelize
  const defaultAttributes = {
    created_at: {
      type: DATE,
      get() {
        return moment((this as any).getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    updated_at: {
      type: DATE,
      get() {
        return moment((this as any).getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss')
      },
    },
  }

  return defaultAttributes || {}
}

export default BaseModel
