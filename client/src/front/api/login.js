import base from './base';
import axios from '../../http/axios';
const Login = {
    login(params) {
        return new Promise((resolve, reject) => {
            axios.post(`${base.login}`, params).then((res) => {
                resolve(res.data)
            }).catch(error => {
                reject(error.data)
            })
        })
    },
    timeToken() {
        return new Promise((resolve, reject) => {
            axios.get(`${base.timetoken}`).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error.data)
            })
        })
    }
}
export default Login;