import base from './base';
import axios from '../../http/axios';

const User = {
  getUserInfo(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.getUserInfo}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  getUserResource(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.getUserResource}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  searchUserResource(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.searchUserResource}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  delUserResource(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.delUserResource}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  getUserAchievement(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.getUserAchievement}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  delUserAchievement(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.delUserAchievement}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  searchUserAchievement(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.searchUserAchievement}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  getUserArticle(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.getUserArticle}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  delUserArticle(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.delUserArticle}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  searchUserArticle(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.searchUserArticle}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  getUserCollect(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.getUserCollect}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  searchUserCollect(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.searchUserCollect}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  delUserCollect(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.delUserCollect}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
};

export default User;
