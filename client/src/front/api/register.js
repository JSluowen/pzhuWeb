import base from './base';
import axios from '../../http/axios';
const Register = {
    // 上传邮箱验证码
    uploadCode(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.code}`, params).then(res => {
                resolve(res.data);
            }).catch(error => {
                reject(error.data);
            })
        })
    },
    //注册用户信息
    registerUser(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.registerUser}`, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error.data)
            })
        })
    }
}
export default Register