'use strict';
exports.security = {
  domainWhiteList: ['http://localhost:8080', 'http://localhost:80001'],
};
// 本地数据库配置
exports.sequelize = {
  dialect: 'mysql',
  database: 'pzhuweb',
  port: '3306',
  host: '127.0.0.1',
  username: 'root',
  password: '123456lw',
};
