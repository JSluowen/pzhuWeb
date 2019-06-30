'use strict';

const Controller = require('egg').Controller;

class Person extends Controller {
    // 获取用户信息
    async getUserinfo() {
        const { ctx } = this;
        const token = ctx.header.authorization;
        try {
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const userid = ctx.session.userid;
                const table = 'UserInfo';
                const resdata = await ctx.service.mysql.findById(userid, table);
                ctx.status = 200;
                if (resdata) {
                    ctx.body = {
                        success: 1,
                        data: {
                            avatar: resdata.dataValues.avatar,
                        },
                    };
                } else {
                    ctx.body = {
                        success: 0,
                        message: '请立即完善个人信息',
                    };
                }
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    // 获取学院专业信息,研究方向信息
    async getInitMessage() {
        const { ctx, app } = this;
        const token = ctx.header.authorization;
        try {
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const table = 'School';
                const table1 = 'Domain';
                const params = {
                    include: {
                        model: app.model.Major,
                    },
                };
                const schoolmajor = await ctx.service.mysql.findAll(params, table);
                const reslut = await ctx.service.fun.getSchool(schoolmajor);
                let domain = await ctx.service.mysql.findAll({}, table1);
                domain = domain.map(item => {
                    return {
                        value: item.dataValues.id,
                        label: item.dataValues.name,
                    };
                });
                ctx.status = 200;
                ctx.body = {
                    success: 1,
                    data: {
                        schoolmajor: reslut,
                        domain,
                    },
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    // 上传头像信息
    async uploadAvatar() {
        const { ctx } = this;
        const token = ctx.header.authorization;
        try {
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { avatar } = ctx.request.body;
                const id = ctx.session.userid;
                const table = 'UserInfo';
                const params = {
                    attributes: ['avatar'],
                    where: {
                        id,
                    },
                };

                const cdn = await ctx.service.qiniu.getCDN(avatar); // 获去cdn链接
                const isUserinfo = await ctx.service.mysql.findById(id, table);
                if (isUserinfo) {
                    const isAvatar = await ctx.service.mysql.findAll(params, table);
                    if (isAvatar[0].dataValues.avatar == null) {
                        await isUserinfo.update({
                            avatar: cdn,
                        });
                        ctx.status = 200;
                        ctx.body = {
                            success: 1,
                            data: {
                                avatar: cdn,
                            },
                        };
                    } else {
                        const exitAvatar = isAvatar[0].dataValues.avatar;
                        const oldCDN = exitAvatar.split('/')[3];
                        await ctx.service.qiniu.deleteFile('webimg', oldCDN);
                        await isUserinfo.update({
                            avatar: cdn,
                        });
                        ctx.status = 200;
                        ctx.body = {
                            success: 1,
                            data: {
                                avatar: cdn,
                            },
                        };
                    }
                } else {
                    await ctx.service.mysql.create(
                        {
                            id,
                            avatar: cdn,
                        },
                        table,
                    );
                    ctx.status = 200;
                    ctx.body = {
                        success: 1,
                        data: {
                            avatar: cdn,
                        },
                    };
                }
            }
        } catch (err) {
            ctx.status = 500;
            console.log(err);
        }
    }
    // 上传用户编辑信息
    async uploadUserInfo() {
        const { ctx } = this;
        const token = ctx.header.authorization;
        try {
            const author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const { phone, domain, schoolMajor, description, avatar, status } = ctx.request.body;
                const id = ctx.session.userid;
                const table = 'UserInfo';
                let cdn;
                if (parseInt(status) === 1) {
                    cdn = await ctx.service.qiniu.getCDN(avatar); // 获去cdn链接
                } else {
                    cdn = avatar;
                }
                const isUserinfo = await ctx.service.mysql.findById(id, table);
                if (isUserinfo) {
                    const params = {
                        phone,
                        school: schoolMajor[0],
                        major: schoolMajor[1],
                        domain: domain[0],
                        description,
                        avatar: cdn,
                    };
                    const url = isUserinfo.dataValues.avatar;
                    const arr = url.split('/');
                    const key = arr[3];
                    try {
                        if (key !== 'avatar' && url !== cdn) {
                            await ctx.service.qiniu.deleteFile('webimg', key);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    await isUserinfo.update(params);
                    ctx.status = 200;
                    ctx.body = {
                        success: 1,
                    };
                } else {
                    const params1 = {
                        id,
                        phone,
                        school: schoolMajor[0],
                        major: schoolMajor[1],
                        description,
                        avatar: cdn,
                        domain: domain[0]
                    };
                    await ctx.service.mysql.create(params1, table);
                    ctx.status = 200;
                    ctx.body = {
                        success: 1,
                    };
                }
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async getInitInfo() {
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
                const result = await ctx.service.mysql.findAll(params, table);
                if (result.length !== 0) {
                    ctx.status = 200;
                    ctx.body = {
                        success: 1,
                        data: result[0].dataValues,
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
}
module.exports = Person;
