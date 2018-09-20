import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1535344013986_4422';

  // add your config here
  // config.middleware = ['errorHandler'];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.bcrypt = {
    saltRounds: 10, // default 10
  };

  config.i18n = {
    queryField: 'locale',
    cookieField: 'locale',
    // Cookie 默认一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: '1y',
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/eggpress',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };

  config.jwt = {
    secret: 'OCA!8J(64g+7h6^1&xk9x3Z(Y!*8+j0y',
  };

  return config;
};
