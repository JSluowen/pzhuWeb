'use strict';
const Controller = require('egg').Controller;

class Collect extends Controller {
  async getMenuLabel() {
        const { ctx } = this;
        try {
            let token = ctx.header.authorization;
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                let table = 'Menu';
                let result = await ctx.service.mysql.findAll({}, table);
                result = result.map(item => {
                    return item.dataValues
                })
                ctx.status = 200
                ctx.body = {
                    success: 1,
                    data: result
                }
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async getCollectList() {
        const { ctx, app } = this
        try {
            let token = ctx.header.authorization;
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403
            } else {
                let { id, limit, offset } = ctx.request.body
                limit = parseInt(limit)
                offset = parseInt(offset)
                let params = {
                    include: [
                        {
                            model: app.model.Article,
                            include: [{
                                model: app.model.User
                            }, {
                                model: app.model.Menu
                            }, {
                                model: app.model.Technology
                            }
                            ],
                        }
                    ],
                    where: {
                        userid: id

                    },
                    order: [
                        ['id', "DESC"]
                    ],
                    offset: offset,
                    limit: limit
                }
                let table = 'Favorite'
                let resultNum = await ctx.service.mysql.findAll({ where: { userid: id } }, table);
                let Num = parseInt(resultNum.length)
                let result = await ctx.service.mysql.findAll(params, table)
                result = result.map(item => {
                    return item.dataValues
                })
                ctx.status = 200;
                if (Num - (offset % Num) > limit) {
                    ctx.body = {
                        success: 1,
                        data: result
                    }
                } else {
                    ctx.body = {
                        success: 0,
                        data: result
                    }
                }

            }

        } catch (err) {
            ctx.status = 404;
            console.log(err)
        }
    }

    async cancelCollect() {
        const { ctx } = this
        try {
            let token = ctx.header.authorization;
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403
            } else {
                let { id } = ctx.request.body
                let table = 'Favorite'
                let favorite = await ctx.service.mysql.findById(id, table)
                await favorite.destroy()
                ctx.status = 200;
                ctx.body = {
                    success: 1
                }
            }
        } catch (err) {
            ctx.status = 404
            console.log(err)
        }
    }

    async collectSearch() {
        const { ctx, app } = this
        const { Op } = app.Sequelize
        try {
            let token = ctx.header.authorization;
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403
            } else {
                let { id, value } = ctx.request.body;
                let params = {
                    include: [
                        {
                            model: app.model.Article,
                            where: {
                                title: {
                                    [Op.like]: '%' + value + '%'
                                }
                            },
                            include: [{
                                model: app.model.User
                            }, {
                                model: app.model.Menu
                            }, {
                                model: app.model.Technology
                            }
                            ],
                        }
                    ],
                    where: {
                        userid: id
                    },
                }
                let table = 'Favorite'
                let result = await ctx.service.mysql.findAll(params, table)
                console.log(result)
                result = result.map(item => {
                    return item.dataValues
                })
                ctx.status = 200
                ctx.body = {
                    success: 1,
                    data: result
                }

            }
        } catch (err) {
            console.log(err);
            ctx.status = 404
        }
    }
}
module.exports = Collect;