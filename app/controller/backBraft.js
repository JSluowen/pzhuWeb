'use strict';

const Controller = require('egg').Controller;

class Braft extends Controller {
    async getMediaItems() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const table = 'Media';
                const mediaItems = await ctx.service.mysql.findAll({ where: { status: 1 } }, table);
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: mediaItems
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async removeMedia() {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { data } = ctx.request.body;
                const table = 'Media';
                const arry = data.map(item => {
                    return {
                        id: item.id
                    };
                });
                const params = {
                    where: {
                        [Op.or]: arry
                    }
                };
                const media = await ctx.service.mysql.findAll(params, table);
                for (const item of media) {
                    await item.update({ status: 0 });
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
    async uploadMedia() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { articleid, key } = ctx.request.body;
                const link = await ctx.service.qiniu.getCDN(key);
                const table = 'Media';
                const params = {
                    articleid,
                    link,
                    key
                };
                const media = await ctx.service.mysql.create(params, table);
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: media
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
}
module.exports = Braft;
