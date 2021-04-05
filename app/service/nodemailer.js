'use strict'
// 阿里云邮箱推送服务
const nodemailer = require('nodemailer')
const Service = require('egg').Service

class Nodemailer extends Service {
  async sendEmail(email, content) {
    const { config } = this
    const transporter = nodemailer.createTransport({
      host: 'smtpdm.aliyun.com',
      port: 80,
      secureConnection: false, // use SSL
      auth: {
        user: config.nodemailer.user, // user name
        pass: config.nodemailer.pass, // password
      },
    })
    const mailOptions = {
      from: `WEB应用专业团队<${config.nodemailer.from}>`,
      to: email,
      subject: content.subject,
      text: content.text,
      replyTo: config.nodemailer.replyTo,
      // html:'<b>Hello world</b><img src="http://cdn.hiclay.top/1.jpg" style="width:200px;height:auto">',//html body
      // attachments: [
      //     {
      //         filename: 'text0.txt',
      //         content: 'hello world!'
      //     },
      //     {
      //         filename: 'text1.txt',
      //         path: './app.js'
      //     },{
      //         filename:'test.JPG',
      //         path:'./Desert.jpg',
      //         cid:'01'
      //    }
      // ],
    }
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
          reject(error)
        }
        resolve(info)
      })
    })
  }
}

module.exports = Nodemailer
