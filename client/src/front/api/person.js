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
    //获取初始信息：学院专业，研究方向
    getInitMessage() {
        return new Promise((resolve, reject) => {
            axios.get(`${base.getInitMessage}`).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    getInitInfo(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getInitInfo}`,params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })

    }

}

export default Person;