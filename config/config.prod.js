'use strict';
exports.security = {
  domainWhiteList: ['http://www.pzhuweb.cn', 'http://admin.pzhuweb.cn', 'http://140.143.124.13'],
};
// 线上数据库配置
exports.sequelize = {
  dialect: 'mysql',
  database: 'pzhuweb',
  port: '3306',
  host: '140.143.124.13',
  username: 'root',
  password: 'root',
};
