'use strict';
const Controller = require('egg').Controller;

class Login extends Controller {
    async adminLogin() {
        const { ctx } = this;
        try {
            const { id, password } = ctx.request.body;
            const table = 'User';
            const user = await ctx.service.mysql.findById(id, table);
            ctx.status = 200;
            if (!user) {
                ctx.body = {
                    success: 0,
                    message: '账号不存在'
                };
            } else if (user.dataValues.password !== password) {
                ctx.body = {
                    success: 0,
                    message: '密码错误'
                };
            } else if (user.dataValues.status < 2) {
                ctx.body = {
                    success: 0,
                    message: '非管理员账号,禁止登录'
                };
            } else {
                const token = await ctx.service.jwt.signToken(id);
                ctx.session.userid = id;
                ctx.body = {
                    success: 1,
                    data: {
                        token,
                        id,
                        password
                    }
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
}

module.exports = Login;
