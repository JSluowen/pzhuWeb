import base from './base';
import axios from '../../http/axios';
const Article = {
    getArticleInfo(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getArticleInfo}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    istop(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.istop}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    deleteArticle(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.deleteArticle}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    onSerachArticle(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.onSerachArticle}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    delTag(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.delTag}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    addTag(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.addTag}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    }


}

export default Article;