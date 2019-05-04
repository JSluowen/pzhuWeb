import base from './base'
import axios from '../../http/axios'

const Collect = {
    //获取技术标签
    getMenuLabel() {
        return new Promise((resolve, reject) => {
            axios.get(`${base.getMenuLabel}`).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    getCollectList(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.getCollectList}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    cancelCollect(params){
        return new Promise((resolve,reject)=>{
            axios.post(`${base.cancelCollect}`,params).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err.data)
            })
        })
    },
    collectSearch(params){
        return new Promise((resolve,reject)=>{
            axios.post(`${base.collectSearch}`,params).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err.data)
            })
        })
    }

}

export default Collect;