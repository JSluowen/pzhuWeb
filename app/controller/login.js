const Controller = require('egg').Controller;
const md5 = require('md5');

class Login extends Controller {
    async login() {
        const {
            ctx
        } = this;
        const {
            id,
            password
        } = ctx.request.body;
        let time = ctx.session.time;
        let table = 'User';
        try {
            let isExist = await ctx.service.mysql.findById(id, table)
            if (isExist == null) {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    message: '账号不存在'
                }
            } else if (md5(isExist.dataValues.password + time) != password) {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    message: '密码错误'
                }
            } else if (isExist.dataValues.status == 0) {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    message: '账号正在审核中，请联系管理员。'
                }
            } else {
                ctx.status = 200;
                let token = await ctx.service.jwt.signToken(id);
                ctx.body = {
                    success: 1,
                    data: {
                        token: token,
                        id: isExist.id,
                        password: isExist.dataValues.password,
                        name: isExist.dataValues.name
                    }
                }
            }
        } catch (err) {
            ctx.status = 404;
            console.log(err);
            ctx.body = {
                message: '登录失败'
            }
        }

    }
    async loginToken() {
        let time = Date.now();
        this.ctx.session.time = time;
        this.ctx.body = {
            success: 1,
            message: time
        }
    }
    //忘记密码
    async forgetPassword() {
        const {
            ctx
        } = this;
        const {
            ids,
            passwords,
            emails
        } = ctx.request.body;
        try {
            let table = 'User';
            let params = {
                where: {
                    id: ids,
                    email: emails
                }
            }
            let isUser = await ctx.service.mysql.findAll(params, table);
            if (isUser.length != 0) {
                ctx.session.id = ids;
                ctx.session.password = passwords;
                ctx.status = 200;
                ctx.body = {
                    success: 1
                }
            } else {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    message: '用户信息有误'
                }
            }
        } catch (err) {
            // console.log(err)
            ctx.status = 404;

        }
    }
    //修改密码
    async changePassword() {
        const {
            ctx
        } = this;
        try {
            const {
                code
            } = ctx.request.body;
            if (ctx.session.code != code) {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    message: '验证码有误'
                }
            } else {
                let id = ctx.session.id;
                let table = 'User';
                let isUser = await ctx.service.mysql.findById(id, table);
                await isUser.update({
                    password: ctx.session.password
                })
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: {
                        password: ctx.session.password
                    }
                }
            }

        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
}
module.exports = Login;