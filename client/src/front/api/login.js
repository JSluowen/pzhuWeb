import base from './base';
import axios from '../../http/axios';
const Login = {
  // 用户登录
  login(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.login}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error.data);
        });
    });
  },
  // 时间令牌
  timeToken() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${base.timetoken}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error.data);
        });
    });
  },
  // 忘记密码
  forgetPassword(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.forgetPassword}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
  // 修改密码
  changePassword(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.changePassword}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
};
export default Login;
