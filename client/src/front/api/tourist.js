import base from './base';
import axios from '../../http/axios';
const Tourist = {
    getTouristInfo(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getTouristInfo}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    getTouristArticle(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getTouristArticle}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    searchTouristArticle(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.searchTouristArticle}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    getTouristAchievement(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getTouristAchievement}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    searchTouristAchievement(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.searchTouristAchievement}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    getTouristResource(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getTouristResource}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    searchTouristResource(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.searchTouristResource}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    getTouristCollect(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getTouristCollect}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    searchTouristCollect(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.searchTouristCollect}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    }

}
export default Tourist;