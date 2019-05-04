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
    }
}

export default Article