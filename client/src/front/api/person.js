import base from './base';
import axios from '../../http/axios';

const Person = {
    // 获取用户基本信息
    getUserinfo(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.userInfo}`, params).then((res) => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    //上传头像信息
    uploadAvatar(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.uploadAvatar}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    //上传用户个人编辑信息
    uploadUserInfo(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.uploadUserInfo}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    //查询用户的个人详情信息
    selectSchoolMajor(){
        return new Promise((resolve,reject)=>{
            axios.get(`${base.selectSchoolMajor}`).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err.data)
            })
        })
    }

}

export default Person;