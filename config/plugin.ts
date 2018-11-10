import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  static: true,

  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },
}

export default plugin
