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
                const table1 = 'Technology';
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
                    attributes: ['id', 'title', 'keywords', 'top', 'updated_at', 'created_at'],
                    order: [['created_at', 'DESC']],
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
                const tag = await ctx.service.mysql.findAll(params1, table1);
                const total = allArticle.length;
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: {
                        articleList,
                        total,
                        tag
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
                if (checked === 'true') {
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
    async onSerachArticle() {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { index, value } = ctx.request.body;
                const table = 'Article';
                let params;
                if (index === '1') {
                    params = {
                        include: [
                            {
                                model: app.model.UserInfo,
                                attributes: ['avatar'],
                                include: [
                                    {
                                        model: app.model.User,
                                        attributes: ['name'],

                                    }
                                ]
                            }, {
                                model: app.model.Technology
                            }
                        ],
                        where: {
                            status: 1,
                            title: {
                                [Op.like]: '%' + value + '%',
                            }
                        },
                        attributes: ['id', 'title', 'keywords', 'top', 'updated_at', 'created_at'],
                        order: [['created_at', 'DESC']],
                    };
                }
                const article = await ctx.service.mysql.findAll(params, table);
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: article
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async delArticleTag() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { tagid } = ctx.request.body;
                const table = 'Technology';
                const tc = await ctx.service.mysql.findById(tagid, table);
                await tc.update({ status: 0 });
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: tc
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async addArticleTag() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { tagName } = ctx.request.body;
                const table = 'Technology';
                const params = {
                    where: {
                        name: tagName
                    }
                };
                const isTec = await ctx.service.mysql.findAll(params, table);
                if (isTec.length !== 0) {
                    // 标签已存在
                    if (isTec[0].dataValues.status === 1) {
                        ctx.status = 200;
                        ctx.body = {
                            success: 0,
                            message: '标签已存在'
                        };
                        // 标签恢复
                    } else if (isTec[0].dataValues.status === 0) {
                        await isTec[0].update({ status: 1 });
                        ctx.status = 200;
                        ctx.body = {
                            success: 1
                        };
                    }
                } else {
                    await ctx.service.mysql.create({ name: tagName }, table);
                    ctx.status = 200;
                    ctx.body = {
                        success: 1
                    };
                }
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async getArticleEdit() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id } = ctx.request.body;
                const table = 'Menu';
                const table1 = 'Technology';
                const table2 = 'Article';
                const menu = await ctx.service.mysql.findAll({ where: { status: 1 } }, table);
                const technology = await ctx.service.mysql.findAll({ where: { status: 1 } }, table1);
                const params = {
                    where: {
                        id
                    }
                };
                const article = await ctx.service.mysql.findAll(params, table2);// 用户编辑文章
                if (article.length !== 0) {
                    ctx.status = 200;
                    ctx.body = {
                        success: 1,
                        data: {
                            menu,
                            technology,
                            article,
                        }
                    };
                } else {
                    ctx.status = 200;
                    ctx.body = {
                        success: 0
                    };
                }
            }
        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
}
module.exports = Article;
