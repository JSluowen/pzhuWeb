const Controller = require('egg').Controller;
const md5 = require('md5');

class Login extends Controller {
    async login() {
        const {
            ctx
        } = this;
        let value = ctx.request.body;
        let table = 'User';
        try {
            let isExist = await ctx.service.mysql.findById(value.id, table)
            if (isExist == null) {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    message: '账号不存在'
                }
            } else if (isExist.dataValues.password != md5(value.password)) {
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
                let token = await ctx.service.jwt.signToken(value.id);
                ctx.body={
                    success:1,
                    message:'登录成功',
                    token:token
                }
            }
        } catch (err) {
            ctx.status = 404;
            ctx.body = {
                message: '登录失败'
            }
        }

    }
}
module.exports = Login;