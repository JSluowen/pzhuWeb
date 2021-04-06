'use strict';
exports.security = {
  domainWhiteList: ['http://localhost:8080', 'http://localhost:8001'],
};
// 本地数据库配置
// exports.sequelize = {
//   dialect: 'mysql',
//   database: 'pzhuweb',
//   port: '7788',
//   host: 'www.pzhuweb.cn',
//   username: 'wutaotao',
//   password: 'wtt666andvery666',
// };
exports.sequelize = {
  dialect: 'mysql',
  database: 'pzhuweb',
  port: '3306',
  host: 'localhost',
  username: 'root',
  password: null,
};
