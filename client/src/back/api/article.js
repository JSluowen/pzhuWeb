import base from './base';
import axios from '../../http/axios';
const Article = {
  getArticleInfo(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getArticleInfo}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  istop(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.istop}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  deleteArticle(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.deleteArticle}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  onSerachArticle(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.onSerachArticle}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  delArticleTag(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.delArticleTag}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  addArticleTag(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.addArticleTag}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  getArticleEdit(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getArticleEdit}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })

    })
  },
  uploadBackArticle(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.uploadBackArticle}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })

    })
  }


}

export default Article;