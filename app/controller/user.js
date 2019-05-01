'use strict';
const Controller = require('egg').Controller;

class User extends Controller {
    async getUserInfo() {
        const { ctx, app } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
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
                        },
                    ],
                    where: {
                        id,
                    },
                };
                let userinfo = await ctx.service.mysql.findAll(params, table);
                if (userinfo.length !== 0) {
                    userinfo = userinfo[0].dataValues;
                    const article = await ctx.service.mysql.findAll({ where: { userid: id } }, table1);
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
            }
        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
    async getUserResource() {
        const { ctx, app } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                let { id, index, beg, end } = ctx.request.body;
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
                    attributes: ['id', 'typeid', 'userid', 'title'],
                    where: {
                        userid: id,
                    },
                    order: [['id', 'DESC']],
                };
                const resourceType = await ctx.service.mysql.findAll({}, table);
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
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async searchUserResource() {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id, value } = ctx.request.body;
                const table = 'Resource';
                const params = {
                    include: [
                        {
                            model: app.model.ResourceType
                        }
                    ],
                    attributes: ['id', 'typeid', 'userid', 'title'],
                    where: {
                        userid: id,
                        title: {
                            [Op.like]: '%' + value + '%',
                        },
                    },
                    order: [['id', 'DESC']],
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
            }
        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
}

module.exports = User;
