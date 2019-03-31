module.exports = app => {
  const { router, controller } = app;
  router.post('/api/code',controller.register.uploadCode);//上传邮箱验证码
  router.post('/api/registeruser',controller.register.registerUser);//注册用户信息
  router.post('/api/login',controller.login.login);//用户登录
  router.get('/api/logintoken',controller.login.loginToken)//获取登录权限
  router.post('/api/forgetpassword',controller.login.forgetPassword)//忘记密码
  router.post('/api/changepassword',controller.login.changePassword)//修改密码
}