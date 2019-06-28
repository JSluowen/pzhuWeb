'use strict';

const Controller = require('egg').Controller;

class Article extends Controller {
    async getArticle() {
        const { ctx, app } = this;
        try {
            let { beg, end, index } = ctx.request.body;
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            const userid = ctx.session.userid;
            beg = parseInt(beg);
            end = parseInt(end);
            index = parseInt(index);
            const table = 'Technology';
            const table1 = 'Article';
            const table2 = 'Favorite';
            const params = {
                include: [
                    {
                        model: app.model.Menu
                    },
                    {
                        model: app.model.Technology
                    }, {
                        model: app.model.UserInfo,
                        include: [
                            {
                                model: app.model.User
                            }
                        ]
                    }
                ],
                where: {
                    status: 1
                },
                order: [['created_at', 'DESC']],
            };
            const params1 = {
                where: {
                    status: 1
                },
                order: [['readnumber', 'DESC']],
            };
            const params2 = {
                where: {
                    userid,
                }
            };

            const technology = await ctx.service.mysql.findAll({}, table);
            let article = await ctx.service.mysql.findAll(params, table1);
            let hotArticle = await ctx.service.mysql.findAll(params1, table1);
            let favorite;
            if (userid && author) {
                favorite = await ctx.service.mysql.findAll(params2, table2);
                article = await ctx.service.fun.filterCollect(favorite, article);
            }
            if (index !== 0) {
                article = article.filter(item => {
                    return item.dataValues.technologyid === parseInt(index);
                });
            }
            const slideshow = article.filter(item => {
                return item.dataValues.top === 1;
            });
            hotArticle = hotArticle.splice(0, 10);
            if (parseInt(article.length) > end) {
                article = article.slice(beg, end);
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: {
                        technology,
                        article,
                        slideshow,
                        hotArticle
                    }
                };
            } else {
                article = article.slice(beg);
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    data: {
                        technology,
                        article,
                        slideshow,
                        hotArticle
                    }
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async collectArticle() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id } = ctx.request.body;
                const userid = ctx.session.userid;
                const table = 'Favorite';
                const params = {
                    articleid: id,
                    userid
                };
                await ctx.service.mysql.create(params, table);
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
    async cancelCollect() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id } = ctx.request.body;
                const userid = ctx.session.userid;
                const table = 'Favorite';
                const params = {
                    where: {
                        articleid: id,
                        userid
                    }
                };
                const favorite = await ctx.service.mysql.findAll(params, table);
                await favorite[0].destroy();
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
