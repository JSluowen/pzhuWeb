import axios from '../../http/axios'
import apiList from './apiList';

const Resource = {
    articleList:(params)=>{
        return new  Promise((resolve,reject)=>{
            axios.post(apiList.articleList,params).then((response)=>{
                resolve(response.data);
            }).catch((error)=>{
                reject(error);
            })
        })
    },
    deleteArticle:(params)=>{
        return new Promise((resolve,reject)=>{
            axios.post(apiList.deleteArticle,params).then((response)=>{
                resolve(response)
            }).catch((error)=>{
                reject(error);
            })
        })
    }
}
export default Resource;