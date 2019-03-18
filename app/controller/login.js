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
            } else if (md5(isExist.dataValues.password+time) != password) {
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
                    message: '登录成功',
                    token: token
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
}
module.exports = Login;