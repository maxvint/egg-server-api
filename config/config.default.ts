import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & IBizConfig>

// app special config scheme
export interface IBizConfig {
  sourceUrl: string
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & IBizConfig

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1535344013986_4422'

  // add your config here
  // config.middleware = ['errorHandler']

  config.bcrypt = {
    saltRounds: 10, // default 10
  }

  config.security = {
    csrf: {
      enable: false,
    },
  }

  config.i18n = {
    queryField: 'locale',
    cookieField: 'locale',
    // Cookie 默认一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: '1y',
  }

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'egg-server',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
  }

  config.jwt = {
    secret: 'OCA!8J(64g+7h6^1&xk9x3Z(Y!*8+j0y',
  }

  return config
}
