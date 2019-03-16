module.exports = app => {
  const { router, controller } = app;
  router.post('/api/code',controller.register.uploadCode);//上传邮箱验证码
  router.post('/api/registeruser',controller.register.registerUser);//注册用户信息
  router.post('/api/login',controller.login.login);
}