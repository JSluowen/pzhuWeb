import base from './base';
import axios from '../../http/axios';

const Resource ={
    getResource(params){
        return new Promise((resolve,reject)=>{
            axios.post(`${base.getResource}`, params).then(res=> {
                resolve(res.data)
            }).catch(err=> {
                reject(err.data)
            })

        })
    },
    serachResource(params){
        return new Promise((resolve,reject)=>{
            axios.post(`${base.serachResource}`, params).then(res=> {
                resolve(res.data)
            }).catch(err=> {
                reject(err.data)
            })

        }) 
    }
}

export default Resource