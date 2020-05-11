'use strict';
exports.security = {
  domainWhiteList: ['http://www.pzhuweb.cn', 'http://admin.pzhuweb.cn'],
};
// 线上数据库配置
exports.sequelize = {
  dialect: 'mysql',
  database: 'pzhuweb',
  port: '3306',
  host: '47.99.111.111',
  username: 'root',
  password: 'root',
};
