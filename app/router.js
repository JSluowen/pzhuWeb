'use strict';
module.exports = app => {
  const { router, controller } = app;
  // 首页接口
  router.get('/api/home/getHomeInfo', controller.home.getHomeInfo);// 获取首页信息
  // 登陆接口
  router.post('/api/code', controller.register.uploadCode); // 上传邮箱验证码
  router.post('/api/registeruser', controller.register.registerUser); // 注册用户信息
  router.post('/api/login', controller.login.login); // 用户登录
  router.get('/api/logintoken', controller.login.loginToken); // 登录鉴权信息
  router.post('/api/forgetpassword', controller.login.forgetPassword); // 忘记密码
  router.post('/api/changepassword', controller.login.changePassword); // 修改密码
  router.get('/api/qiniutoken', controller.qiniu.getToken); // 获取七牛云证书秘钥
  // 用户编辑个人信息接口
  router.get('/api/person/userinfo', controller.person.getUserinfo); // 获取用户信息
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
  // 游客访问用户个人界面接口
  router.post('/api/tourist/getTouristInfo', controller.tourist.getTouristInfo);// 游客访问用户个人信息
  router.post('/api/tourist/getTouristArticle', controller.tourist.getTouristArticle);// 游客访问获取用户发布的文章信息
  router.post('/api/tourist/searchTouristArticle', controller.tourist.searchTouristArticle);// 游客搜索用户的文章
  router.post('/api/tourist/getTouristAchievement', controller.tourist.getTouristAchievement);// 游客获取用户的成果
  router.post('/api/tourist/searchTouristAchievement', controller.tourist.searchTouristAchievement);// 游客搜索用户的文章
  router.post('/api/tourist/getTouristResource', controller.tourist.getTouristResource);// 游客访问用户的资源信息
  router.post('/api/tourist/searchTouristResource', controller.tourist.searchTouristResource);// 游客搜索用户资源信息
  router.post('/api/tourist/getTouristCollect', controller.tourist.getTouristCollect);// 游客获取用户的个人收藏
  router.post('/api/tourist/searchTouristCollect', controller.tourist.searchTouristCollect);// 游客搜索用户的个人收藏列表
  // 后台用户管理接口
  router.post('/api/back/adminLogin', controller.backLogin.adminLogin);// 后台管理员登录
  router.get('/api/back/getadminInfo', controller.backUser.getadminInfo);// 获取管理员的信息
  router.post('/api/back/getUserInfo', controller.backUser.getUserInfo);// 获取管理用户的信息
  router.post('/api/back/userReviewPass', controller.backUser.userReviewPass);// 用户审核通过
  router.post('/api/back/userRefuseJoin', controller.backUser.userRefuseJoin);// 拒绝用户通过
  router.post('/api/back/deleteUser', controller.backUser.deleteUser);// 拒绝用户通过
  router.post('/api/back/getAddUserInfo', controller.backUser.getAddUserInfo);// 获取修改和添加用户的信息
  router.post('/api/back/updateUserInfo', controller.backUser.updateUserInfo);// 更新用户的信息
  router.post('/api/back/addUserInfo', controller.backUser.addUserInfo);// 添加用户信息
  // 后台文章管理接口
  router.post('/api/back/getArticleInfo', controller.backArticle.getArticleInfo);// 获取后台文章管理信息
  router.post('/api/back/istop', controller.backArticle.istop);// 是否置顶
  router.post('/api/back/deleteArticle', controller.backArticle.deleteArticle);// 删除文章
  router.post('/api/back/onSerachArticle', controller.backArticle.onSerachArticle);// 搜索文章
  router.post('/api/back/delArticleTag', controller.backArticle.delArticleTag);// 删除文章技术标签
  router.post('/api/back/addArticleTag', controller.backArticle.addArticleTag);// 添加文章技术标签
  router.post('/api/back/getArticleEdit', controller.backArticle.getArticleEdit);// 编辑文章信息
  // 后台资源管理接口
  router.post('/api/back/getResourceInfo', controller.backResource.getResourceInfo);
  router.post('/api/back/delResource', controller.backResource.delResource);// 删除资源信息
  router.post('/api/back/addResourceTag', controller.backResource.addResourceTag);// 添加资源类别
  router.post('/api/back/delResourceTag', controller.backResource.delResourceTag);// 删除资源类别
  router.post('/api/back/onSerachResource', controller.backResource.onSerachResource);// 搜索资源信息
  // 后台成果管理接口
  router.post('/api/back/getAchievementInfo', controller.backAchievement.getAchievementInfo);// 获取成果信息
  router.post('/api/back/delAchievement', controller.backAchievement.delAchievement);// 删除成果
  router.post('/api/back/addAchievementTag', controller.backAchievement.addAchievementTag);// 添加成果类别
  router.post('/api/back/delAchievementTag', controller.backAchievement.delAchievementTag);// 删除成果类别
  router.post('/api/back/onSerachAchievement', controller.backAchievement.onSerachAchievement);// 搜索成果
  router.post('/api/back/isShow', controller.backAchievement.isShow);// 是否展示成果
  // 后台文章编辑接口
  router.get('/api/back/getMediaItems', controller.backBraft.getMediaItems);// 获取编辑器媒体的初始内容
  router.post('/api/back/removeMedia', controller.backBraft.removeMedia); // 删除编辑器媒体内容
  router.post('/api/back/uploadMedia', controller.backBraft.uploadMedia); // 添加编辑器媒体内容
  router.post('/api/back/uploadBackArticle', controller.backBraft.uploadBackArticle);// 上传编辑后的文章内容
};

