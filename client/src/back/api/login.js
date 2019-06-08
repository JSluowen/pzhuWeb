import base from './base';
import axios from '../../http/axios';
const Login = {
    adminLogin(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.adminLogin}`, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
        })
    }
}
export default Login;