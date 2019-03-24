import base from './base';
import axios from '../../http/axios';

const Person ={
    // 获取用户基本信息
    getUserinfo(params){
        return new Promise((resolve,reject)=>{
            axios.post(`${base.userInfo}`,params).then((res)=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err.data)
            })
        })
    }
}

export default Person;