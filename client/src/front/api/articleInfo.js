import base from './base';
import axios from '../../http/axios';
import { reject } from 'bluebird';
const ArticleInfo = {
    getArticleInfo(params) {
        return new Promise((resolve, rejcet) => {
            axios.post(`${base.getArticleInfo}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    }
}

export default ArticleInfo