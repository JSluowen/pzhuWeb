import base from './base';
import axios from '../../http/axios';
import qs from 'qs';


const register={
    // 上传邮箱验证码
    uploadCode(params){
        return new Promise((resolve,reject)=>{
            axios.post(`${base.code}`,qs.stringify(params)).then(res=>{
                resolve(res.data);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    //注册用户信息
    registerUser(params){
        return new Promise((resolve,reject)=>{
            axios.post(`${base.registerUser}`,qs.stringify(params)).then(res=>{
                resolve(res.data)
            }).catch(error=>{
                reject(error)
            })
        })
    }
}
export default register