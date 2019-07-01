'use strict';

const Controller = require('egg').Controller;

class Member extends Controller {
    async getMemberInfo() {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        try {
            const table = 'UserInfo';
            const table1 = 'Domain';
            const params = {
                include: [
                    {
                        model: app.model.User,
                        where: {
                            status: {
                                [Op.gt]: 0
                            }
                        }
                    },
                    {
                        model: app.model.School,
                    },
                    {
                        model: app.model.Major,
                    },
                ],
            };
            const userinfo = await ctx.service.mysql.findAll(params, table);
            const domain = await ctx.service.mysql.findAll({}, table1);
            ctx.status = 200;
            ctx.body = {
                success: 1,
                data: userinfo,
                domain
            };
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
}

module.exports = Member;
