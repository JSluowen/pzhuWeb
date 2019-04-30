import axios from '../../http/axios'
import apiList from './apiList';
const User = {
    allList:(params)=>{
        return new Promise((resolve, reject) => {
            axios.post(apiList.all, params).then((res) => {
                resolve(res.data)
            }).catch(error => {
                reject(error.data)
            })
        })
    },
    applyList:(params)=>{
        return new Promise((resolve,reject)=>{
            axios.post(apiList.apply,params).then((res)=>{
                resolve(res.data);
            }).catch((error)=>{
                reject(error.data);
            })
        });
    },

    softDeleteOne:(params)=>{
        return new Promise((resolve,reject)=>{
            axios.post(apiList.userDelete,params).then((res)=>{
                resolve(res.data);
            }).catch((error)=>{
                reject(error.data);
            })
        });
    },

    agreeOne:(params)=>{
        return new Promise((resolve,reject)=>{
            axios.post(apiList.userAgree,params).then((res)=>{
                resolve(res.data);
            }).catch((error)=>{
                reject(error.data);
            })
        });
    },
    info:(params)=>{
        return new Promise((resolve,reject)=>{
            axios.post(apiList.userInfo,params).then((res)=>{
                resolve(res.data);
            }).catch((error)=>{
                reject(error.data);
            })
        });
    }
}

export default User;
