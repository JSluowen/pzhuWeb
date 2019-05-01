'use strict';

const Controller = require('egg').Controller;

class Achievement extends Controller {
    async getAchievement() {
        const { ctx, app } = this;
        try {
            let { beg, end, index } = ctx.request.body;
            index = parseInt(index);
            const table = 'AchievementType';
            const table1 = 'Achievement';
            const params = {
                include: [
                    {
                        model: app.model.UserInfo,
                        attributes: ['avatar'],
                        include: [
                            {
                                model: app.model.User,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            };
            let acType = await ctx.service.mysql.findAll({}, table);
            let ac = await ctx.service.mysql.findAll(params, table1);
            acType = await ctx.service.fun.filterTypeNum(acType, ac);
            ac = await ctx.service.fun.filterType(ac, index);
            if (ac.length >= end) {
                ac = ac.slice(beg, end);
            } else {
                ac = ac.slice(beg);
            }
            ctx.status = 200;
            ctx.body = {
                success: 1,
                data: {
                    ac,
                    acType
                }
            };
        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
}

module.exports = Achievement;
