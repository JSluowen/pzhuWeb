import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  521: '用户没有权限（令牌、用户名、密码错误）。',
};
axios.defaults.baseURL = 'http://127.0.0.1:7001/api';

// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = 'http://127.0.0.1:7001/api';
// } else {
//   axios.defaults.baseURL = 'http://140.143.124.13:7001/api';
// }
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 允许axio请求携带cookies
axios.defaults.withCredentials = true;
// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token || localStorage.admin;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response?.data?.success === 0) {
        message.warn(response?.data?.message);
      }
      if (response?.data?.success === 1) {
        if (response?.data?.message) {
          message.success(response?.data?.message);
        }
      }
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  error => {
    if (error.response.config.url.includes('getUserInfo')) {
      return Promise.reject(error.response);
    }
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
          message.error(codeMessage[error.response.status]);
      }
    }
  },
);
export default axios;
export { axios };
