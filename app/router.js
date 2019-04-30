module.exports = app => {
  const {
    router,
    controller
  } = app;

  const verify = app.middleware.verify({
    token: 'webJWT'
  }); //登录权限验证中间件

  router.post('/api/code', controller.register.uploadCode); //上传邮箱验证码
  router.post('/api/registeruser', controller.register.registerUser); //注册用户信息
  router.post('/api/login', controller.login.login); //用户登录
  router.get('/api/logintoken', controller.login.loginToken) //登录鉴权信息
  router.get('/api/qiniutoken', controller.qiniu.getToken) //获取七牛云证书秘钥
  router.post('/api/person/userinfo', controller.person.getUserinfo) //获取用户信息
  router.post('/api/back/user/all',controller.userManage.all)//后台请求成员列表信息
  router.post('/api/back/user/info',controller.userManage.info);
  router.post('/api/back/user/apply',controller.userManage.apply);
  router.post('/api/back/user/softDeleteOne',controller.userManage.softDelete);
  router.post('/api/back/user/agreeOne',controller.userManage.agreeOne);
}
