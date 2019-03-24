import { userInfo } from "os";

// 路由API管理

const base = {
    code:'/code',    // 注册邮箱验证
    registerUser:'/registeruser', // 用户注册
    login:'/login',//用户登录
    timetoken:'/logintoken',//获取登录时间秘钥
    qiniuToken:'/qiniutoken',//获取七牛云上传证书
    userInfo:'/person/userinfo'// 获取用户的基本信息
}
export default base;