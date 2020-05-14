import base from './base';
import axios from '../../http/axios';
const Achievement = {
  getAchievementInfo(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.getAchievementInfo}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
  delAchievement(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.delAchievement}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
  addAchievementTag(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.addAchievementTag}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
  delAchievementTag(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.delAchievementTag}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
  onSerachAchievement(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.onSerachAchievement}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
  isShow(params) {
    return new Promise((resolve, rejected) => {
      axios
        .post(`${base.isShow}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          rejected(err.data);
        });
    });
  },
};

export default Achievement;
