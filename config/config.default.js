module.exports = appInfo => {
  const config = {};

  config.keys = "pzhuweb";

  // config.host = 'http://www.pzhuweb.cn';

  config.security = {
    csrf: false
  }

  config.bodyParser = {
    jsonLimit: '100mb',
    formLimit: '100mb',
  }

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    database: 'pzhuweb',
    port: '3306',
    host:'127.0.0.1',
    username: 'root',
    password: '123456',
  }

  return config;
};