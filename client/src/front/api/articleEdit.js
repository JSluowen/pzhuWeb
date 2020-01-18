import base from './base';
import axios from '../../http/axios';
const ArticleEdit = {
  getArticleEdit(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.getArticleEdit}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  uploadArticleInfo(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.uploadArticleInfo}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  uploadArticleeCover(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.uploadArticleeCover}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  delCoverImg(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.delCoverImg}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  uploadArticleResource(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.uploadArticleResource}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  getMediaItems() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${base.getMediaItems}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  removeMedia(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.removeMedia}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
};

export default ArticleEdit;
