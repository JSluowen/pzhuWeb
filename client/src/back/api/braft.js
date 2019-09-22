import base from './base';
import axios from '../../http/axios';
const Braft ={
  getMediaItems(){
    return new Promise((resolve,reject)=>{
      axios.get(`${base.getMediaItems}`).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err.data)
      })
    })
  },
  removeMedia(params){
    return new Promise((resolve,reject)=>{
      axios.post(`${base.removeMedia}`,params).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err.data)
      })
    })
  },
  uploadMedia(params){
    return new Promise((resolve,reject)=>{
      axios.post(`${base.uploadMedia}`,params).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err.data)
      })
    })
  }
}

export default Braft