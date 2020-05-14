import base from './base';
import axios from '../../http/axios';
const Resource = {
  getResourceInfo(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.getResourceInfo}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
  delResource(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.delResource}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
  addResourceTag(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.addResourceTag}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
  delResourceTag(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.delResourceTag}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
  onSerachResource(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.onSerachResource}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
};

export default Resource;
