import base from './base';
import axios from '../../http/axios';

const Resource ={
    getResource(){
        return new Promise((resolve,reject)=>{
            axios.get(`${base.getResource}`).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err.data)
            })

        })
    }
}

export default Resource