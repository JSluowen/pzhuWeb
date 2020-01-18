import base from './base';
import axios from '../../http/axios';

const Home = {
  getHomeInfo() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${base.getHomeInfo}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};
export default Home;
