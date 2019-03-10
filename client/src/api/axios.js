import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:7001/api'

axios.defaults.timeOut = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';





export default axios