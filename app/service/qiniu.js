'use strict';
const qiniu = require('qiniu');
const Service = require('egg').Service;

class QiniuService extends Service {
    // 获取签名证书秘钥
    async getToken(scope) {
        const { config } = this;
        const options = {
            scope,
        };
        const mac = new qiniu.auth.digest.Mac(config.qiniuKey.accessKey, config.qiniuKey.secretKey);
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        return uploadToken;
    }

    // 获取cdn链接
    async getCDN(key) {
        const { config } = this;
        const mac = new qiniu.auth.digest.Mac(config.qiniuKey.accessKey, config.qiniuKey.secretKey);
        const configs = new qiniu.conf.Config();

        const bucketManager = new qiniu.rs.BucketManager(mac, configs);
        const publicBucketDomain = 'http://img.pzhuweb.cn';
        // 公开空间访问链接
        const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
        return publicDownloadUrl;
    }
    // 删除单个文件
    async deleteFile(bucket, key) {
        const { config } = this;
        const mac = new qiniu.auth.digest.Mac(config.qiniuKey.accessKey, config.qiniuKey.secretKey);
        const configs = new qiniu.conf.Config();
        configs.zone = qiniu.zone.Zone_z2;
        const bucketManager = new qiniu.rs.BucketManager(mac, configs);
        bucketManager.delete(bucket, key, (err, respBody, respInfo) => {
            if (err) {
                return err;
            }
            return respInfo.statusCode;
        });
    }
}
module.exports = QiniuService;
