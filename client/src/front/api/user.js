import base from './base';
import axios from '../../http/axios';

const User = {
    getUserInfo(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getUserInfo}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    getUserResource(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getUserResource}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    searchUserResource(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.searchUserResource}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        }) 
    }
}

export default User