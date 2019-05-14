'use strict';

const Controller = require('egg').Controller;

class ArticleEdit extends Controller {
    async getArticleEdit() {
        const { ctx, app } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id } = ctx.request.body;
                const userid = ctx.session.userid;
                const table = 'Menu';
                const table1 = 'Technology';
                const table2 = 'Article';
                const menu = await ctx.service.mysql.findAll({}, table);
                const technology = await ctx.service.mysql.findAll({}, table1);
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
                        userid,
                        status: 2
                    }
                };
                const params2 = {
                    where: {
                        id,
                        userid
                    }
                };
                let article;
                if (id === '') {
                    article = await ctx.service.mysql.findAll(params, table2);
                } else {
                    article = await ctx.service.mysql.findAll(params2, table2);
                }
                if (article.length === 0) {
                    article = await ctx.service.mysql.create({ userid, status: 2 }, table2);
                    ctx.status = 200;
                    ctx.body = {
                        success: 1,
                        data: {
                            menu,
                            technology,
                            article
                        }
                    };
                } else {
                    ctx.status = 200;
                    ctx.body = {
                        success: 0,
                        data: {
                            menu,
                            technology,
                            article
                        }
                    };
                }
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async uploadArticleeCover() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id, status, key } = ctx.request.body;
                const userid = ctx.session.userid;
                const table = 'Article';
                const postlink = await ctx.service.qiniu.getCDN(key);
                const params = {
                    userid,
                    postlink,
                    status: 2
                };
                let article;
                if (parseInt(status) === 1) {
                    article = await ctx.service.mysql.create(params, table);
                } else {
                    article = await ctx.service.mysql.findById(id, table);
                    await article.update(params);
                }
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: article
                };
            }
        } catch (err) {
            console.log(err);
            ctx.state = 404;
        }
    }
    async uploadArticleInfo() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id, title, status, abstract, context, raw, postlink, technologyid, keywords, menuid } = ctx.request.body;
                const userid = ctx.session.userid;
                const table = 'Article';
                const params = {
                    where: {
                        id,
                        userid
                    }
                };
                const params1 = {
                    id,
                    userid,
                    title,
                    raw,
                    context,
                    postlink,
                    status: 1,
                    technologyid,
                    menuid,
                    keywords,
                    abstract
                };
                let article;
                if (parseInt(status) === 1) {
                    article = await ctx.service.mysql.create(params1, table);
                } else {
                    article = await ctx.service.mysql.findAll(params, table);
                    await article[0].update(params1);
                }
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                };

            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async delCoverImg() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id, postlink } = ctx.request.body;
                const arry = postlink.split('/');
                const key = arry[arry.length - 1];
                const table = 'Article';
                const params = {
                    postlink: ''
                };
                const article = await ctx.service.mysql.findById(id, table);
                await article.update(params);
                await ctx.service.qiniu.deleteFile('webimg', key);
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
    async uploadArticleResource() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { id, key } = ctx.request.body;
                const userid = ctx.session.userid;
                const link = await ctx.service.qiniu.getCDN(key);
                const table = 'Media';
                const params = {
                    articleid: id,
                    userid,
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
            ctx.status = 404;
            console.log(err);
        }
    }
    async getMediaItems() {
        const { ctx } = this;
        try {
            const token = ctx.header.authorization;
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const table = 'Media';
                const userid = ctx.session.userid;
                const mediaItems = await ctx.service.mysql.findAll({ where: { userid, status: 1 } }, table);
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
}

module.exports = ArticleEdit;
