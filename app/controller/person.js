const Controller = require('egg').Controller;

class Person extends Controller {
    async getUserinfo() {
        const {
            ctx
        } = this;
        let token = ctx.header.authorization;
        try {
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const {
                    id
                } = ctx.request.body;
                let table = 'UserInfo';
                let resdata =await ctx.service.mysql.findById(id, table);
                ctx.status = 200;
                if (resdata) {
                    ctx.body = {
                        success: 1,
                        data: {
                            avatar: resdata.dataValues.avatar
                        }
                    }
                } else {
                    ctx.body = {
                        success: 0,
                        message: '请立即完善个人信息'
                    }
                }
            }
        } catch (err) {
            ctx.status = 404
        }

    }
}
module.exports = Person;