const Controller = require('egg').Controller

class Member extends Controller {
    async getMemberInfo() {
        const { ctx, app } = this;
        try {
            let table = "UserInfo"
            let table1 = 'Domain'
            let params = {
                include: [
                    {
                        model: app.model.User
                    }, {
                        model: app.model.School
                    }, {
                        model: app.model.Major
                    }
                ],
            }
            let userinfo = await ctx.service.mysql.findAll(params, table)
            let domain = await ctx.service.mysql.findAll({}, table1)
            ctx.status = 200;
            ctx.body = {
                success: 1,
                data: userinfo,
                domain: domain,
                // teacherInfo:teacherInfo
            }
        } catch (err) {
            console.log(err)
            ctx.status = 404;
        }
    }
}

module.exports = Member