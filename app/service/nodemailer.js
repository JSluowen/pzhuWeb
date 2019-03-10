//阿里云邮箱推送服务
const nodemailer = require('nodemailer');
const Service = require('egg').Service;

class Nodemailer extends Service{
    async sendEmail(email,content){
        let  transporter = nodemailer.createTransport({
            "host": "smtpdm.aliyun.com",
            "port": 80,
            "secureConnection": false, // use SSL
            "auth": {
                "user": 'pluto731', // user name
                "pass": 'lqx1231.'         // password
            }
        });


    }
}

module.exports = Nodemailer



