'use strict';

const Controller = require('egg').Controller;

class ArticleInfo extends Controller {
    async getArticleInfo() {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        try {
            const { id } = ctx.request.body;
            const table = 'Article';
            const params = {
                include: [
                    {
                        model: app.model.Menu
                    },
                    {
                        model: app.model.Technology,
                    },
                    {
                        model: app.model.UserInfo,
                        attributes: ['avatar'],
                        include: [
                            {
                                model: app.model.User,
                                attributes: ['name'],
                            }
                        ]
                    }
                ],
                where: {
                    id,
                    status: 1
                }
            };
            const article = await ctx.service.mysql.findAll(params, table);
            if (article.length === 0) {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                };
                return;
            }
            const number = article[0].dataValues.readnumber;
            await article[0].update({ readnumber: parseInt(number) + 1 });
            const technologyid = article[0].dataValues.technologyid;
            const params1 = {
                where: {
                    technologyid,
                    id: {
                        [Op.ne]: id
                    }
                },
                attributes: ['id', 'postlink', 'title'],
                order: [['created_at', 'DESC']],
                limit: 3
            };
            const recommend = await ctx.service.mysql.findAll(params1, table);
            ctx.status = 200;
            ctx.body = {
                success: 1,
                data: {
                    article,
                    recommend
                }
            };
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
}
module.exports = ArticleInfo;
