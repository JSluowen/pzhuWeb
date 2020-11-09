'use strict';
exports.security = {
  domainWhiteList: ['http://www.pzhuweb.cn', 'http://admin.pzhuweb.cn', 'http://140.143.124.13'],
};
// 线上数据库配置
exports.sequelize = {
  dialect: 'mysql',
  database: 'pzhuweb',
  port: '7788',
  host: 'www.pzhuweb.cn',
  username: 'wutaotao',
  password: 'wtt666andvery666',
};
