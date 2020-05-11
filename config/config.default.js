'use strict';
// eslint-disable-next-line no-unused-vars
module.exports = appInfo => {
  const config = {};

  config.keys = ' pzhuweb';

  // 配置中间件
  // config.appMiddleware = {
  //   middleware: ['verify']
  // }
  config.security = {
    csrf: false
  };

  config.bodyParser = {
    jsonLimit: '100mb',
    formLimit: '100mb',
  };

  // 邮件信息配置
  config.nodemailer = {
    user: 'email@pzhuweb.cn',
    pass: 'PzhuWeb1231',
    from: 'email@pzhuweb.cn',
    replyTo: '497620334@qq.com'
  };

  // 七牛云秘钥
  config.qiniuKey = {
    accessKey: 'RQPDrNQ4aoOWEn_3rMg9xH273n5NuGXizE-JhbOv',
    secretKey: 'MalqHu1GWMf3TXFZM_QrMgIdm76IVETBZ3nmTrEv'
  };

  // token鉴权秘钥
  config.token = 'webJWT';


  // 配置session
  config.session = {
    key: 'SESSION_ID', // key名字
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    encrypt: true, // 加密
    renew: true // 最大时间范围内，刷新，自动增加最大时间
  };
  config.cors = {
    credentials: true
  };

  return config;
};
