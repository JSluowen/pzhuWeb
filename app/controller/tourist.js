'use strict';
const Controller = require('egg').Controller;

class Tourist extends Controller {
    async getTouristInfo() {
        const { ctx, app } = this;
        try {
            const { id } = ctx.request.body;
            const table = 'UserInfo';
            const table1 = 'Article';
            const table2 = 'Favorite';
            const table3 = 'Achievement';
            const table4 = 'Resource';
            const params = {
                include: [
                    {
                        model: app.model.School,
                    },
                    {
                        model: app.model.Major,
                    },
                    {
                        model: app.model.Domain,
                    }, {
                        model: app.model.User,
                        attributes: ['name']
                    }
                ],
                where: {
                    id,
                },
            };
            let userinfo = await ctx.service.mysql.findAll(params, table);
            if (userinfo.length !== 0) {
                userinfo = userinfo[0].dataValues;
                const article = await ctx.service.mysql.findAll({ where: { userid: id, status: 1 } }, table1);
                const articleNum = article.length; // 获取发表文章的数量
                // 获取文章被阅读量
                let readNum = 0;
                if (articleNum !== 0) {
                    readNum = article.map(item => {
                        return item.dataValues.readnumber;
                    });
                    readNum = readNum.reduce((total, currentValue) => {
                        return total + currentValue;
                    });
                }
                const favoriteNum = await ctx.service.mysql.findAll({ where: { userid: id } }, table2);
                const achievementNum = await ctx.service.mysql.findAll({ where: { userid: id } }, table3);
                const resourceNum = await ctx.service.mysql.findAll({ where: { userid: id } }, table4);
                userinfo.readNum = readNum;
                userinfo.articleNum = articleNum;
                userinfo.favoriteNum = favoriteNum.length;
                userinfo.achievementNum = achievementNum.length;
                userinfo.resourceNum = resourceNum.length;
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: userinfo,
                };
            } else {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                };
            }
        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
    async getTouristArticle() {
        const { ctx, app } = this;
        try {
            let { index, beg, end, id } = ctx.request.body;
            index = parseInt(index);
            beg = parseInt(beg);
            end = parseInt(end);
            const table = 'Menu';
            const table1 = 'Article';
            const params = {
                include: [
                    {
                        model: app.model.Menu
                    },
                    {
                        model: app.model.Technology
                    }
                ],
                attributes: ['id', 'technologyid', 'title', 'created_at', 'created_at'],
                where: {
                    userid: id,
                    status: 1
                },
                order: [['created_at', 'DESC']],
            };
            const articleType = await ctx.service.mysql.findAll({}, table);
            let article = await ctx.service.mysql.findAll(params, table1);
            ctx.status = 200;
            if (index !== 0) {
                article = article.filter(item => {
                    return item.dataValues.Menu.id === parseInt(index);
                }); // 过滤资源所对应的类别
            }
            if (parseInt(article.length) > end) {
                article = article.slice(beg, end);
                ctx.body = {
                    success: 1,
                    data: {
                        articleType,
                        article
                    }
                };
            } else {
                article = article.slice(beg);
                ctx.body = {
                    success: 0,
                    data: {
                        articleType,
                        article
                    }
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async searchTouristArticle() {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        try {
            const { value, id } = ctx.request.body;
            const table = 'Article';
            const params = {
                include: [
                    {
                        model: app.model.Menu
                    },
                    {
                        model: app.model.Technology
                    }
                ],
                attributes: ['id', 'technologyid', 'title', 'created_at', 'created_at'],
                where: {
                    userid: id,
                    title: {
                        [Op.like]: '%' + value + '%',
                    },
                    status: 1
                },
                order: [['created_at', 'DESC']],
            };
            const article = await ctx.service.mysql.findAll(params, table);
            if (article.length === 0) {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    data: article
                };
            } else {
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: article
                };
            }
        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
    async getTouristAchievement() {
        const { ctx, app } = this;
        try {
            let { index, beg, end, id } = ctx.request.body;
            index = parseInt(index);
            beg = parseInt(beg);
            end = parseInt(end);
            const table = 'AchievementType';
            const table1 = 'Achievement';
            const params = {
                include: [
                    {
                        model: app.model.AchievementType
                    }
                ],
                attributes: ['id', 'typeid', 'achievementlink', 'attachment', 'userid', 'title', 'created_at'],
                where: {
                    userid: id,
                    status: 1,
                },
                order: [['created_at', 'DESC']],
            };
            const params1 = {
                where: {
                    status: 1
                }
            };
            const acType = await ctx.service.mysql.findAll(params1, table);
            let ac = await ctx.service.mysql.findAll(params, table1);
            ctx.status = 200;
            if (index !== 0) ac = await ctx.service.fun.filterType(ac, index); // 过滤资源所对应的类别
            if (parseInt(ac.length) > end) {
                ac = ac.slice(beg, end);
                ctx.body = {
                    success: 1,
                    data: {
                        acType,
                        ac
                    }
                };
            } else {
                ac = ac.slice(beg);
                ctx.body = {
                    success: 0,
                    data: {
                        acType,
                        ac
                    }
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async searchTouristAchievement() {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        try {
            const { value, id } = ctx.request.body;
            const table = 'Achievement';
            const params = {
                include: [
                    {
                        model: app.model.AchievementType
                    }
                ],
                attributes: ['id', 'typeid', 'userid', 'title', 'created_at'],
                where: {
                    userid: id,
                    title: {
                        [Op.like]: '%' + value + '%',
                    },
                    status: 1
                },
                order: [['created_at', 'DESC']],
            };
            const ac = await ctx.service.mysql.findAll(params, table);
            if (ac.length === 0) {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    data: ac
                };
            } else {
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: ac
                };
            }
        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
    async getTouristResource() {
        const { ctx, app } = this;
        try {
            let { index, beg, end, id } = ctx.request.body;
            index = parseInt(index);
            beg = parseInt(beg);
            end = parseInt(end);
            const table = 'ResourceType';
            const table1 = 'Resource';
            const params = {
                include: [
                    {
                        model: app.model.ResourceType
                    }
                ],
                attributes: ['id', 'typeid', 'link', 'attachment', 'userid', 'title', 'created_at'],
                where: {
                    userid: id,
                    status: 1
                },
                order: [['created_at', 'DESC']],
            };
            const params1 = {
                where: {
                    status: 1
                }
            };
            const resourceType = await ctx.service.mysql.findAll(params1, table);
            let resource = await ctx.service.mysql.findAll(params, table1);
            ctx.status = 200;
            if (index !== 0) resource = await ctx.service.fun.filterType(resource, index); // 过滤资源所对应的类别
            if (parseInt(resource.length) > end) {
                resource = resource.slice(beg, end);
                ctx.body = {
                    success: 1,
                    data: {
                        resourceType,
                        resource
                    }
                };
            } else {
                resource = resource.slice(beg);
                ctx.body = {
                    success: 0,
                    data: {
                        resourceType,
                        resource
                    }
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async searchTouristResource() {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        try {
            const { value, id } = ctx.request.body;
            const table = 'Resource';
            const params = {
                include: [
                    {
                        model: app.model.ResourceType
                    }
                ],
                attributes: ['id', 'typeid', 'userid', 'title', 'created_at'],
                where: {
                    userid: id,
                    title: {
                        [Op.like]: '%' + value + '%',
                    },
                    status: 1
                },
                order: [['created_at', 'DESC']],
            };
            const resource = await ctx.service.mysql.findAll(params, table);
            if (resource.length === 0) {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    data: resource
                };
            } else {
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: resource
                };
            }
        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
    async getTouristCollect() {
        const { ctx, app } = this;
        try {
            let { index, beg, end, id } = ctx.request.body;
            index = parseInt(index);
            beg = parseInt(beg);
            end = parseInt(end);
            const table = 'Menu';
            const table1 = 'Favorite';
            const params = {
                include: [
                    {
                        model: app.model.Article,
                        attributes: ['title', 'id'],
                        include: [
                            {
                                model: app.model.UserInfo,
                                attributes: ['id'],
                                include: [
                                    {
                                        model: app.model.User,
                                        attributes: ['name']
                                    }
                                ]
                            },
                            {
                                model: app.model.Menu,
                            },
                            {
                                model: app.model.Technology,
                            },
                        ],
                    },
                ],
                where: {
                    userid: id,
                },
                attributes: ['id'],
                order: [['created_at', 'DESC']],
            };
            const menu = await ctx.service.mysql.findAll({}, table);
            let collect = await ctx.service.mysql.findAll(params, table1);
            ctx.status = 200;
            if (index !== 0) {
                collect = collect.filter(item => {
                    return item.dataValues.Article.Menu.id === parseInt(index);
                }); // 过滤资源所对应的类别
            }
            if (parseInt(collect.length) > end) {
                collect = collect.slice(beg, end);
                ctx.body = {
                    success: 1,
                    data: {
                        menu,
                        collect
                    }
                };
            } else {
                collect = collect.slice(beg);
                ctx.body = {
                    success: 0,
                    data: {
                        menu,
                        collect
                    }
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async searchTouristCollect() {
        const { ctx, app } = this;
        try {
            const { value, id } = ctx.request.body;
            const table = 'Favorite';
            const params = {
                include: [
                    {
                        model: app.model.Article,
                        attributes: ['title'],
                        include: [
                            {
                                model: app.model.UserInfo,
                                attributes: ['id'],
                                include: [
                                    {
                                        model: app.model.User,
                                        attributes: ['name']
                                    }
                                ]
                            },
                            {
                                model: app.model.Menu,
                            },
                            {
                                model: app.model.Technology,
                            },
                        ],
                    },
                ],
                where: {
                    userid: id,
                },
                order: [['created_at', 'DESC']],
            };
            let collect = await ctx.service.mysql.findAll(params, table);
            collect = collect.filter(item => {
                return item.dataValues.Article.title.indexOf(value) > -1;
            });
            if (collect.length === 0) {
                ctx.status = 200;
                ctx.body = {
                    success: 0,
                    data: collect
                };
            } else {
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: collect
                };
            }
        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
}

module.exports = Tourist;
