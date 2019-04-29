import {
    userInfo
} from "os";

// 路由API管理

const base = {
    code: '/code', // 注册邮箱验证
    registerUser: '/registeruser', // 用户注册
    login: '/login', //用户登录
    timetoken: '/logintoken', //获取登录时间秘钥
    forgetPassword: '/forgetpassword', //忘记密码
    changePassword: '/changepassword', //修改密码
    qiniuToken: '/qiniutoken', //获取七牛云上传证书
    //用户信息编辑接口
    userInfo: '/person/userinfo', // 获取用户的基本信息
    uploadAvatar: '/person/uploadavatar', //上传头像信息
    uploadUserInfo: '/person/uploaduserinfo', //上传用户编辑个人信息
    getInitMessage: '/person/getInitMessage', //获取初始信息学院专业和研究方向
    getInitInfo:'/person/getInitInfo',//获取用户初始化信息
    //用户个人收藏接口
    getMenuLabel:'/collect/getmenulabel',// 获取技术标签
    getCollectList:'/collect/getcollectlist',//获取收藏列表
    cancelCollect:'/collect/cancelcollect',//取消收藏
    collectSearch:'/collect/collectsearch',//收藏夹搜索
    //资源分享界面的API
    getResource:'/resource/getResource'//获取初始化资源
    
}
export default base;