import base from './base';
import { axios } from '../../http/axios';
const Qiniu = {
  // 获取上传证书秘钥
  getToken() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${base.qiniuToken}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  },
};
export default Qiniu;
