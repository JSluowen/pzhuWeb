import base from './base';
import axios from '../../http/axios';
const User = {
  getadminInfo() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${base.getadminInfo}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
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
  userReviewPass(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.userReviewPass}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  userRefuseJoin(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.userRefuseJoin}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  deleteUser(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.deleteUser}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  getAddUserInfo(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.getAddUserInfo}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  updateUserInfo(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.updateUserInfo}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  addUserInfo(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.addUserInfo}`, params)
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
