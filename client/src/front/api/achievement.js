import base from './base';
import axios from '../../http/axios';

const Achievement = {
    getAachievement(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getAchievement}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    searchAchievement(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.searchAchievement}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default Achievement;