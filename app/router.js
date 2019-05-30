'use strict';
module.exports = app => {
    const { router, controller } = app;
    // const verify = app.middleware.verify({   token: 'webJWT' }); //登录权限验证中间件
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
    // 用户个人主页接口
    router.post('/api/user/getUserInfo', controller.user.getUserInfo); // 获取个人主页信息
    router.post('/api/user/getUserResource', controller.user.getUserResource); // 获取个人主界面的资源
    router.post('/api/user/searchUserResource', controller.user.searchUserResource); // 搜索用户个人资源
    router.post('/api/user/delUserResource', controller.user.delUserResource); // 删除用户资源.
    router.post('/api/user/getUserAchievement', controller.user.getUserAchievement); // 获取个人主界面的资源
    router.post('/api/user/delUserAchievement', controller.user.delUserAchievement); // 删除用户成果资源.
    router.post('/api/user/searchUserAchievement', controller.user.searchUserAchievement); // 搜索用户个人成果
    router.post('/api/user/getUserArticle', controller.user.getUserArticle); // 搜索用户个人成果
    router.post('/api/user/delUserArticle', controller.user.delUserArticle); // 删除用户成果资源.
    router.post('/api/user/searchUserArticle', controller.user.searchUserArticle); // 搜索用户个人文章
    router.post('/api/user/getUserCollect', controller.user.getUserCollect); // 获取用户个人收藏信息
    router.post('/api/user/searchUserCollect', controller.user.searchUserCollect); // 搜索用户个人收藏信息
    router.post('/api/user/delUserCollect', controller.user.delUserCollect); // 取消收藏用户的个人收藏.
    // 成员展示界面的信息接口
    router.get('/api/member/getMemberInfo', controller.member.getMemberInfo); // 获取成员展示界面的信息
    // 资源分享界面的接口
    router.post('/api/resource/getResource', controller.resource.getResource); // 获取资源列表
    router.post('/api/resource/searchResource', controller.resource.searchResource); // 搜索资源
    // 成果展示界面的接口
    router.post('/api/achievement/getAchievement', controller.achievement.getAchievement); // 获取成果展示界面的接口
    router.post('/api/achievement/searchAchievement', controller.achievement.searchAchievement); // 搜索成果资源
    // 获取文章界面的接口
    router.post('/api/article/getArticle', controller.article.getArticle); // 获取文章资源
    router.post('/api/article/collectArticle', controller.article.collectArticle); // 收藏文章
    router.post('/api/article/cancelCollect', controller.article.cancelCollect); // 取消文章收藏
    // 获取文章详情界面的接口
    router.post('/api/articleInfo/getArticleInfo', controller.articleInfo.getArticleInfo); // 获取文章详情界面资源
    // 资源发布界面的接口
    router.post('/api/resourceIssue/getResourceIssue', controller.resourceIssue.getResourceIssue); // 获取资源发布界面的信息
    router.post('/api/resourceIssue/uploadResource', controller.resourceIssue.uploadResource); // 上传发布资源
    router.post('/api/resourceIssue/uploadResourceCover', controller.resourceIssue.uploadResourceCover); // 上传封面图片
    router.post('/api/resourceIssue/delResourceCover', controller.resourceIssue.delResourceCover); // 删除资源封面图片
    router.post('/api/resourceIssue/uploadResourceAttachment', controller.resourceIssue.uploadResourceAttachment); // 上传资源附件
    router.post('/api/resourceIssue/delResourceAttachment', controller.resourceIssue.delResourceAttachment); // 删除附加
    // 成果资源发布接口
    router.post('/api/achievementIssue/getAchievementIssue', controller.achievementIssue.getAchievementIssue); // 获取成果发布界面的信息
    router.post('/api/achievementIssue/uploadAchievement', controller.achievementIssue.uploadAchievement); // 上传成果发布资源
    router.post('/api/achievementIssue/uploadAchievementCover', controller.achievementIssue.uploadAchievementCover); // 上传成果封面图片
    router.post('/api/achievementIssue/delAchievementCover', controller.achievementIssue.delAchievementCover); // 删除资源封面图片
    router.post('/api/achievementIssue/uploadAchievementAttachment', controller.achievementIssue.uploadAchievementAttachment); // 上传资源附件
    router.post('/api/achievementIssue/delAchievementAttachment', controller.achievementIssue.delAchievementAttachment); // 删除附加
    // 获取文章编辑界面你的接口
    router.post('/api/articleEdit/getArticleEdit', controller.articleEdit.getArticleEdit); // 获取文章编辑界面的初始信息
    router.post('/api/articleEdit/uploadArticleeCover', controller.articleEdit.uploadArticleeCover);// 上传文章封面
    router.post('/api/articleEdit/uploadArticleInfo', controller.articleEdit.uploadArticleInfo);// 上传文章信息
    router.post('/api/articleEdit/delCoverImg', controller.articleEdit.delCoverImg);// 删除文章封面图
    router.post('/api/articleEdit/uploadArticleResource', controller.articleEdit.uploadArticleResource);// 上传文章的资源
    router.get('/api/articleEdit/getMediaItems', controller.articleEdit.getMediaItems); // 获取初始化媒体库的信息
    router.post('/api/articleEdit/removeMedia', controller.articleEdit.removeMedia); // 删除媒体库的信息
    // 后台管理员界面
    router.post('/api/back/adminLogin', controller.backLogin.adminLogin);// 后台管理员登录
    router.get('/api/back/getadminInfo', controller.backUser.getadminInfo);// 获取管理员的信息
    router.post('/api/back/getUserInfo', controller.backUser.getUserInfo);// 获取管理用户的信息
    router.post('/api/back/userReviewPass', controller.backUser.userReviewPass);// 用户审核通过
    router.post('/api/back/userRefuseJoin', controller.backUser.userRefuseJoin);// 拒绝用户通过
    router.post('/api/back/deleteUser', controller.backUser.deleteUser);// 拒绝用户通过
    router.post('/api/back/getArticleInfo', controller.backArticle.getArticleInfo);// 获取后台文章管理信息
    router.post('/api/back/istop', controller.backArticle.istop);// 是否置顶
    router.post('/api/back/deleteArticle', controller.backArticle.deleteArticle);// 删除文章
};

