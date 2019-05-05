'use strict';

const Controller = require('egg').Controller;

class Article extends Controller {
    async getArticle() {
        const { ctx, app } = this;
        try {
            let { beg, end, index } = ctx.request.body;
            beg = parseInt(beg);
            end = parseInt(end);
            index = parseInt(index);
            const table = 'Technology';
            const table1 = 'Article';
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
                order: [['updated_at', 'DESC']],
            };
            const params1 = {
                order: [['readnumber', 'DESC']],
            };

            const technology = await ctx.service.mysql.findAll({}, table);
            let article = await ctx.service.mysql.findAll(params, table1);
            let hotArticle = await ctx.service.mysql.findAll(params1, table1);
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
}

module.exports = Article;
