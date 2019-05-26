import base from './base';
import axios from '../../http/axios';
const User = {
    getUserInfo() {
        return new Promise((resolve, reject) => {
            axios.get(`${base.getUserInfo}`).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    }
}
export default User