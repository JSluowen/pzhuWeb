const qiniu = require('qiniu')
const Service = require('egg').Service;


class QiniuService extends Service {

    // 获取签名证书秘钥
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
    //获取cdn链接
    async getCDN(key) {
        const {
            config
        } = this;
        let mac = new qiniu.auth.digest.Mac(config.qiniuKey.accessKey, config.qiniuKey.secretKey);
        let configs = new qiniu.conf.Config();

        let bucketManager = new qiniu.rs.BucketManager(mac, configs);
        let publicBucketDomain = 'http://img.pzhuweb.cn';
        // 公开空间访问链接
        let publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
        return publicDownloadUrl
    }
    // 删除单个文件
    async deleteFile(bucket, key) {
        const {
            config
        } = this;
        var mac = new qiniu.auth.digest.Mac(config.qiniuKey.accessKey, config.qiniuKey.secretKey);
        var configs = new qiniu.conf.Config();
        configs.zone = qiniu.zone.Zone_z2;
        var bucketManager = new qiniu.rs.BucketManager(mac, configs);
        bucketManager.delete(bucket, key, (err, respBody, respInfo) => {
            if (err) {
                return err
            } else {
                return respInfo.statusCode

            }
        })
    }

}
module.exports = QiniuService;