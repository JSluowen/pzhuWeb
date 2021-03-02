import axios from 'src/http/axios';
const Base = {
  uploadCode: '/code', // 注册邮箱验证
  registerUser: '/registeruser', // 用户注册
  login: '/login', // 用户登录
  timetoken: '/logintoken', // 获取登录时间秘钥
  forgetPassword: '/forgetpassword', // 忘记密码
  changePassword: '/changepassword', // 修改密码
  qiniuToken: '/qiniutoken', // 获取七牛云上传证书
  delFile: '/delfile',
  // 用户信息编辑接口
  userInfo: '/person/userinfo', // 获取用户的基本信息
  uploadAvatar: '/person/uploadavatar', // 上传头像信息
  uploadUserInfo: '/person/uploaduserinfo', // 上传用户编辑个人信息
  getInitMessage: '/person/getInitMessage', // 获取初始信息学院专业和研究方向
  getInitInfo: '/person/getInitInfo', // 获取用户初始化信息
  // 用户个人收藏接口
  getMenuLabel: '/collect/getmenulabel', // 获取技术标签
  getCollectList: '/collect/getcollectlist', // 获取收藏列表
  cancelCollect: '/collect/cancelcollect', // 取消收藏
  collectSearch: '/collect/collectsearch', // 收藏夹搜索
  // 用户个人界面接口
  getUserInfo: '/user/getUserInfo', // 获取用户个人信息
  getUserResource: '/user/getUserResource', // 获取用户个人资源信息
  searchUserResource: '/user/searchUserResource', // 搜索用户个人资源信息
  delUserResource: '/user/delUserResource', // 删除用户资源
  getUserAchievement: '/user/getUserAchievement', // 获取用户成果资源
  delUserAchievement: '/user/delUserAchievement', // 删除用户的成果资源
  searchUserAchievement: '/user/searchUserAchievement', // 搜索用户的成果信息
  getUserArticle: '/user/getUserArticle', // 获取个人文章信息
  delUserArticle: '/user/delUserArticle', // 删除用户的文章信息
  searchUserArticle: '/user/searchUserArticle', // 搜索用户的文章信息
  getUserCollect: '/user/getUserCollect', // 获取用户个人收藏信息
  searchUserCollect: '/user/searchUserCollect', // 搜索收藏信息列表
  delUserCollect: '/user/delUserCollect', // 取消收藏
  // 成员信息界面接口
  getMemberInfo: '/member/getMemberInfo', // 获取成员展示界面的信息
  // 获取资源列表接口
  getResource: '/resource/getResource', // 获取资源界面初始化资源
  serachResource: '/resource/searchResource', // 搜索资源
  // 成果展示的接口
  getAchievement: '/achievement/getAchievement', // 获取成果
  searchAchievement: '/achievement/searchAchievement', // 搜索成果
  // 获取文章界面的接口
  getArticle: '/article/getArticle', // 获取文章界面的接口
  collectArticle: '/article/collectArticle', // 收藏文章
  cancelArticleCollect: '/article/cancelCollect', // 取消收藏文章
  // 获取文章详情界面的接口
  getArticleInfo: '/articleInfo/getArticleInfo', // 获取文章详情界面的接口
  // 资源发布界面的接口
  getResourceIssue: '/resourceIssue/getResourceIssue', // 获取资源发布的信息
  uploadResource: '/resourceIssue/uploadResource', // 上传资源信息
  uploadResourceCover: '/resourceIssue/uploadResourceCover', // 上传资源封面图
  delResourceCover: '/resourceIssue/delResourceCover', // 删除封面图片
  uploadResourceAttachment: '/resourceIssue/uploadResourceAttachment', // 上传资源附件
  delResourceAttachment: '/resourceIssue/delResourceAttachment', // 删除附加
  // 成果发布界面接口
  getAchievementIssue: '/achievementIssue/getAchievementIssue', // 获取成果发布的信息
  uploadAchievement: '/achievementIssue/uploadAchievement', // 上传成果信息
  uploadAchievementCover: '/achievementIssue/uploadAchievementCover', // 上传资源封面图
  delAchievementCover: '/achievementIssue/delAchievementCover', // 删除封面图片
  uploadAchievementAttachment: '/achievementIssue/uploadAchievementAttachment', // 上传资源附件
  delAchievementAttachment: '/achievementIssue/delAchievementAttachment', // 删除附加
  // 回去文章编辑界面的接口
  getArticleEdit: '/articleEdit/getArticleEdit', // 获取文章编辑界面的初始化信息
  uploadArticleInfo: '/articleEdit/uploadArticleInfo', // 上传文章信息
  uploadArticleeCover: '/articleEdit/uploadArticleeCover', // 上传文章封面图
  delCoverImg: '/articleEdit/delCoverImg', // 删除文章封面图
  uploadArticleResource: '/articleEdit/uploadArticleResource', // 上传文章的资源
  getMediaItems: '/articleEdit/getMediaItems', // 获取初始化媒体库的信息
  removeMedia: '/articleEdit/removeMedia', // 删除媒体库资源
  // 游客访问用户信息
  getTouristInfo: '/tourist/getTouristInfo', // 游客访问获取用户信息
  getTouristArticle: '/tourist/getTouristArticle', // 获取文章信息
  searchTouristArticle: '/tourist/searchTouristArticle', // 游客搜索用户文章
  getTouristAchievement: '/tourist/getTouristAchievement', // 游客访问用户的成果信息
  searchTouristAchievement: '/tourist/searchTouristAchievement', // 游客搜索用户的成果信息
  getTouristResource: '/tourist/getTouristResource', // 游客访问用户的资源信息
  searchTouristResource: '/tourist/searchTouristResource', // 游客搜索用户的资源信息
  getTouristCollect: '/tourist/getTouristCollect', // 游客获取用户的个人收藏信息
  searchTouristCollect: '/tourist/searchTouristCollect', // 游客获取用户个人收藏信息
  // 首页信息获取接口
  getHomeInfo: '/home/getHomeInfo', // 获取首页的信息
  //相册
  getAlbumTypes: '/album/getAlbumTypes',
  getAlbums: '/album/getAlbums',
  createAlbum: '/album/createAlbum',
  uploadPhotos: '/album/uploadPhotos',
  getPhotosByAlbumId: '/album/getPhotosByAlbumId',
};

export interface IRes {
  data?: { [propName: string]: any } & Array<any>;
  success?: number;
  message?: string;
}

const Get = function(url: string) {
  return new Promise<IRes>((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};

const Post = function(url: string, params: { [key: string]: any }) {
  return new Promise<IRes>((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};

export { Base, Get, Post };
