import base from './base';
import axios from '../../http/axios';
const ArticleInfo = {
  getArticleInfo(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.getArticleInfo}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
};

export default ArticleInfo;
