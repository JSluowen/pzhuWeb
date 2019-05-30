'use strict';

const Controller = require('egg').Controller;

class Article extends Controller {
    async getArticleInfo() {
        const { ctx, app } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                let { page, pageSize } = ctx.request.body;
                page = parseInt(page);
                pageSize = parseInt(pageSize);
                const table = 'Article';
                // const table1 = 'Technology';
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
                        }, {
                            model: app.model.Technology
                        }
                    ],
                    where: {
                        status: 1
                    },
                    attributes: ['id', 'title', 'keywords', 'top', 'updated_at'],
                    order: [['updated_at', 'DESC']],
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                };
                const params1 = {
                    where: {
                        status: 1
                    }
                };
                const articleList = await ctx.service.mysql.findAll(params, table);
                const allArticle = await ctx.service.mysql.findAll(params1, table);
                const total = allArticle.length;
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: {
                        articleList,
                        total
                    }
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async istop() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { checked, id } = ctx.request.body;
                const table = 'Article';
                const article = await ctx.service.mysql.findById(id, table);
                if (checked) {
                    await article.update({ top: 1 });
                } else {
                    await article.update({ top: 0 });
                }
                ctx.status = 200;
                ctx.body = {
                    success: 1
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async deleteArticle() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id } = ctx.request.body;
                const table = 'Article';
                const article = await ctx.service.mysql.findById(id, table);
                await article.update({ status: 0 });
                ctx.status = 200;
                ctx.body = {
                    success: 1
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
}
module.exports = Article;
