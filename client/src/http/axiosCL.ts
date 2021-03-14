import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

var Axios = axios.create();
Axios.defaults.baseURL = 'rs.qbox.me';
Axios.defaults.timeout = 10000;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
// 响应拦截
Axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 403:
          message.error('登录过期，请重新登录');
          localStorage.removeItem('token');
          break;
        case 404:
          message.error('资源不存在');
          break;
        default:
          message.error('请求有误');
      }
    }
  },
);
// get封装
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      params,
      method: 'get',
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// post封装
export function post(url, params = {}, data = {}) {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      method: 'post',
      params,
      data,
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// delete封装
export function del(url, params = {}, data = {}) {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      method: 'delete',
      params,
      data,
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
//   Blob封装,resopnseType:Blob一般是用于文件下载
export function getBlob(url, params = {}) {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      method: 'get',
      params,
      responseType: 'blob',
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  get,
  post,
  del,
  getBlob,
};
