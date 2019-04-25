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
  router.post('/api/forgetpassword', controller.login.forgetPassword)//忘记密码
  router.post('/api/changepassword', controller.login.changePassword)//修改密码
  router.get('/api/qiniutoken', controller.qiniu.getToken) //获取七牛云证书秘钥
  //用户编辑个人信息接口
  router.post('/api/person/userinfo', controller.person.getUserinfo) //获取用户信息
  router.post('/api/person/uploadavatar', controller.person.uploadAvatar)//上传头像信息
  router.post('/api/person/uploaduserinfo', controller.person.uploadUserInfo)//上传用户编辑信息
  router.get('/api/person/selectschoolmajor', controller.person.selectSchoolMajor)//获取学院专业信息
  //用户个人收藏接口
  router.get('/api/collect/getmenulabel', controller.collect.getMenuLabel)//获取技术标签接口
  router.post('/api/collect/getcollectlist', controller.collect.getCollectList)//获取收藏列表
  router.post('/api/collect/cancelcollect',controller.collect.cancelCollect)//取消收藏
  router.post('/api/collect/collectsearch',controller.collect.collectSearch)//收藏夹搜索
}

