import * as qiniu from 'qiniu-js'
import qiniuAPI from '../api/qiniu'

function qiniuUpload(file) {
    return new Promise((resolve, reject) => {
        qiniuAPI.getToken().then(res => {
            let token = res.data
            let key = Date.now();
            let config = {
                useCdnDomain: true, //是否使用 cdn 加速域名
                region: qiniu.region.z2 //选择上传域名 华南
            }
            let putExtra={
                fname: file.name,
                params: {},
                mimeType: ["image/png", "image/jpeg", "image/gif"]
            }
            var observable = qiniu.upload(file, key, token, putExtra, config)
            let observer = {
                next(res) {
                    
                },
                error(err) {
                    reject(err)
                },
                complete(res) {
                    resolve(res)
                }
            }
            let subscription = observable.subscribe(observer)
        }).catch(err => {
            reject(err)
        })
    })
}

export default qiniuUpload