'use strict';
const Controller = require('egg').Controller;

class BackUser extends Controller {
    async getadminInfo() {
        const { ctx, app } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const id = ctx.session.userid;
                const table = 'UserInfo';
                const params = {
                    include: [
                        {
                            model: app.model.User,
                            attributes: ['name'],
                        }
                    ],
                    attributes: ['avatar'],
                    where: {
                        id
                    }
                };
                const admin = await ctx.service.mysql.findAll(params, table);
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: admin
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async getUserInfo() {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                let { page, pageSize } = ctx.request.body;
                page = parseInt(page);
                pageSize = parseInt(pageSize);
                const table = 'UserInfo';
                const table1 = 'User';
                const params = {
                    include: [
                        {
                            model: app.model.User,
                            attributes: ['name'],
                            where: {
                                status: {
                                    [Op.gte]: 1
                                }
                            }
                        },
                        {
                            model: app.model.Domain
                        },
                        {
                            model: app.model.Major
                        }
                    ],
                    attributes: ['id', 'avatar', 'phone', 'created_at'],
                    order: [['created_at', 'DESC']],
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                };
                const params1 = {
                    where: {
                        status: 0
                    },
                    attributes: ['id', 'name', 'email', 'created_at'],
                    order: [['created_at', 'DESC']],
                };
                const params2 = {
                    include: [
                        {
                            model: app.model.User,
                            attributes: ['name'],
                            where: {
                                status: {
                                    [Op.gte]: 1
                                }
                            }
                        },
                        {
                            model: app.model.Domain
                        },
                        {
                            model: app.model.Major
                        }
                    ],
                    attributes: ['id', 'avatar', 'phone', 'created_at'],
                };
                // 获取全部的成员信息
                const user = await ctx.service.mysql.findAll(params2, table);
                const total = user.length;
                // 获取审核中成员信息
                const reviewUser = await ctx.service.mysql.findAll(params1, table1);
                // 根据年级分组
                const gradeGroup = await ctx.service.backUser.gradeGroup(user);
                // 分组获取成员信息
                const allUser = await ctx.service.mysql.findAll(params, table);
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: {
                        allUser,
                        reviewUser,
                        gradeGroup,
                        total
                    }
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async userReviewPass() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id } = ctx.request.body;
                const table = 'User';
                const user = await ctx.service.mysql.findById(id, table);
                await user.update({ status: 1 });
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
    async userRefuseJoin() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id } = ctx.request.body;
                const table = 'User';
                const user = await ctx.service.mysql.findById(id, table);
                user.destroy();
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
    async deleteUser() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id } = ctx.request.body;
                const table = 'User';
                const user = await ctx.service.mysql.findById(id, table);
                await user.update({ status: -1 });
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
module.exports = BackUser;
