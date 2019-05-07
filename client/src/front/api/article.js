import base from './base';
import axios from '../../http/axios';

const Article = {
    getArticle(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getArticle}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    collectArticle(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.collectArticle}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    cancelCollect(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.cancelCollect}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    }
}

export default Article