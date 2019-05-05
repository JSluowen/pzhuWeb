'use strict';
module.exports = app => {
    const { router, controller } = app;
    // const verify = app.middleware.verify({
    //   token: 'webJWT'
    // }); //登录权限验证中间件
    router.post('/api/code', controller.register.uploadCode); // 上传邮箱验证码
    router.post('/api/registeruser', controller.register.registerUser); // 注册用户信息
    router.post('/api/login', controller.login.login); // 用户登录
    router.get('/api/logintoken', controller.login.loginToken); // 登录鉴权信息
    router.post('/api/forgetpassword', controller.login.forgetPassword); // 忘记密码
    router.post('/api/changepassword', controller.login.changePassword); // 修改密码
    router.get('/api/qiniutoken', controller.qiniu.getToken); // 获取七牛云证书秘钥
    // 用户编辑个人信息接口
    router.post('/api/person/userinfo', controller.person.getUserinfo); // 获取用户信息
    router.post('/api/person/uploadavatar', controller.person.uploadAvatar); // 上传头像信息
    router.post('/api/person/uploaduserinfo', controller.person.uploadUserInfo); // 上传用户编辑信息
    router.get('/api/person/getInitMessage', controller.person.getInitMessage); // 获取初始信息：学院专业，研究方向
    router.post('/api/person/getInitInfo', controller.person.getInitInfo); // 获取用户个人信息
    // 用户个人收藏接口
    router.get('/api/collect/getmenulabel', controller.collect.getMenuLabel); // 获取技术标签接口
    router.post('/api/collect/getcollectlist', controller.collect.getCollectList); // 获取收藏列表
    router.post('/api/collect/cancelcollect', controller.collect.cancelCollect); // 取消收藏
    router.post('/api/collect/collectsearch', controller.collect.collectSearch); // 收藏夹搜索
    // 用户个人主页接口
    router.post('/api/user/getUserInfo', controller.user.getUserInfo); // 获取个人主页信息
    router.post('/api/user/getUserResource', controller.user.getUserResource); // 获取个人主界面的资源
    router.post('/api/user/searchUserResource', controller.user.searchUserResource);// 搜索用户个人资源
    router.post('/api/user/delUserResource', controller.user.delUserResource);// 删除用户资源.
    router.post('/api/user/getUserAchievement', controller.user.getUserAchievement); // 获取个人主界面的资源
    router.post('/api/user/delUserAchievement', controller.user.delUserAchievement);// 删除用户成果资源.
    router.post('/api/user/searchUserAchievement', controller.user.searchUserAchievement);// 搜索用户个人成果
    router.post('/api/user/getUserArticle', controller.user.getUserArticle);// 搜索用户个人成果
    router.post('/api/user/delUserArticle', controller.user.delUserArticle);// 删除用户成果资源.
    router.post('/api/user/searchUserArticle', controller.user.searchUserArticle);// 搜索用户个人文章
    // 成员展示界面的信息接口
    router.get('/api/member/getMemberInfo', controller.member.getMemberInfo); // 获取成员展示界面的信息
    // 资源分享界面的接口
    router.post('/api/resource/getResource', controller.resource.getResource); // 获取资源列表
    router.post('/api/resource/searchResource', controller.resource.searchResource); // 搜索资源
    // 成果展示界面的接口
    router.post('/api/achievement/getAchievement', controller.achievement.getAchievement);// 获取成果展示界面的接口
    router.post('/api/achievement/searchAchievement', controller.achievement.searchAchievement);// 搜索成果资源
    // 获取文章界面的接口
    router.post('/api/article/getArticle', controller.article.getArticle);// 获取文章资源
    // 获取文章详情界面的接口
    router.post('/api/articleInfo/getArticleInfo', controller.articleInfo.getArticleInfo); // 获取文章详情界面资源
    // 资源发布界面的接口
    router.post('/api/resourceIssue/getResourceIssue', controller.resourceIssue.getResourceIssue);// 获取资源发布界面的信息
    router.post('/api/resourceIssue/uploadResource', controller.resourceIssue.uploadResource); // 上传发布资源
    router.post('/api/resourceIssue/uploadResourceCover', controller.resourceIssue.uploadResourceCover);// 上传封面图片
    router.post('/api/resourceIssue/delResourceCover', controller.resourceIssue.delResourceCover);// 删除资源封面图片
    router.post('/api/resourceIssue/uploadResourceAttachment', controller.resourceIssue.uploadResourceAttachment);// 上传资源附件
    router.post('/api/resourceIssue/delAttachment', controller.resourceIssue.delAttachment);// 删除附加
    // 成果资源发布接口
    router.post('/api/achievementIssue/getAchievementIssue', controller.achievementIssue.getAchievementIssue);// 获取成果发布界面的信息
    router.post('/api/achievementIssue/uploadAchievement', controller.achievementIssue.uploadAchievement); // 上传成果发布资源
    router.post('/api/achievementIssue/uploadAchievementCover', controller.achievementIssue.uploadAchievementCover);// 上传成果封面图片
    router.post('/api/achievementIssue/delAchievementCover', controller.achievementIssue.delAchievementCover);// 删除资源封面图片
    router.post('/api/achievementIssue/uploadAchievementAttachment', controller.achievementIssue.uploadAchievementAttachment);// 上传资源附件
    router.post('/api/achievementIssue/delAttachment', controller.achievementIssue.delAttachment);// 删除附加
};
