const qiniu = require('qiniu')
const Service = require('egg').Service;
class QiniuService extends Service {
    async getToken(scope) {
        const {
            config
        } = this;
        let options = {
            scope: scope
        }
        let mac = new qiniu.auth.digest.Mac(config.qiniuKey.accessKey, config.qiniuKey.secretKey);
        let putPolicy = new qiniu.rs.PutPolicy(options);
        let uploadToken = putPolicy.uploadToken(mac);
        return uploadToken;
    }
}
module.exports = QiniuService;