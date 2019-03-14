const Controller = require('egg').Controller;
const md5 = require('md5');

class Register extends Controller {
    async uploadCode() {
        const {
            ctx
        } = this;
        let email = ctx.request.body.email;
        let code = "";
        for (var i = 0; i < 6; i++) {
            code += Math.floor(Math.random() * 10);
        }
        let content = {
            subject: 'web专业应用团队',
            text: `您好,您在web专业应用团队官网的验证码:${code},如果不是本人，请忽略这条信息。`,
        }

        ctx.session.code = code
        // ctx.cookies.set('code',code)

        console.log('验证码：', ctx.session.code)

        try {
            await ctx.service.nodemailer.sendEmail(email, content);
            ctx.status = 200;
            ctx.body = {
                success: 1,
                message: "邮件发送成功，请注意查收！"
            }
        } catch (error) {
            ctx.status = 404;
            ctx.body = {
                message: '无效的邮箱地址'
            }
        }

    }
    async registerUser() {
        const {
            ctx
        } = this;
        let val = ctx.request.body;
        console.log(val)
        let UserTable = "User"
        try {
            let isExist = await ctx.service.mysql.findById(val.schoolId, UserTable);
            if (isExist !== null) {
                ctx.status = 202;
                ctx.body = {
                    success: 0,
                    message: "账号已存在"
                }
            } else if (ctx.session.code !== val.code) {
                ctx.status = 202;
                ctx.body = {
                    success: 0,
                    message: '验证码有误'
                }
            } else {
                let params = {
                    id: val.schoolId,
                    password: md5(val.password),
                    name: val.name,
                    email: val.email
                }
                await ctx.service.mysql.create(params, UserTable);
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    message: '注册成功'
                }
            }
        } catch (err) {
            ctx.status = 404;
            ctx.body = {
                message: '注册失败，请检查信息是否输入正确'
            }
        }
    }
}
module.exports = Register;