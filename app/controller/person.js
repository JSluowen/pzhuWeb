const Controller = require('egg').Controller;

class Person extends Controller {
    //获取用户信息
    async getUserinfo() {
        const {
            ctx
        } = this;
        let token = ctx.header.authorization;
        try {
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const {
                    id
                } = ctx.request.body;
                let table = 'UserInfo';
                let resdata = await ctx.service.mysql.findById(id, table);
                ctx.status = 200;
                if (resdata) {
                    ctx.body = {
                        success: 1,
                        data: {
                            avatar: resdata.dataValues.avatar
                        }
                    }
                } else {
                    ctx.body = {
                        success: 0,
                        message: '请立即完善个人信息'
                    }
                }
            }
        } catch (err) {
            ctx.status = 404
        }

    }
    //获取学院专业信息,研究方向信息
    async getInitMessage() {
        const {
            ctx,
            app
        } = this
        let token = ctx.header.authorization;
        try {
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                let table = 'School'
                let table1 = 'Domain'
                let params = {
                    include: {
                        model: app.model.Major
                    }
                }
                let schoolmajor = await ctx.service.mysql.findAll(params, table)
                let reslut = await ctx.service.fun.getSchool(schoolmajor)
                let domain = await ctx.service.mysql.findAll({}, table1)
                domain = domain.map(item => {
                    return {
                        value: item.dataValues.id,
                        label: item.dataValues.name
                    }
                })
                ctx.status = 200
                ctx.body = {
                    success: 1,
                    data: {
                        schoolmajor: reslut,
                        domain: domain
                    }
                }
            }
        } catch (err) {
            console.log(err)
            ctx.status = 404
        }
    }
    //上传头像信息
    async uploadAvatar() {
        const {
            ctx
        } = this;
        let token = ctx.header.authorization;
        try {
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const {
                    avatar,
                    id
                } = ctx.request.body;
                let table = 'UserInfo';
                let params = {
                    attributes: ['avatar'],
                    where: {
                        id: id
                    }
                }

                let cdn = await ctx.service.qiniu.getCDN(avatar); //获去cdn链接
                let isUserinfo = await ctx.service.mysql.findById(id, table);
                if (isUserinfo) {
                    let isAvatar = await ctx.service.mysql.findAll(params, table);
                    if (isAvatar[0].dataValues.avatar == null) {
                        await isUserinfo.update({
                            avatar: cdn
                        })
                        ctx.status = 200;
                        ctx.body = {
                            success: 1,
                            data: {
                                avatar: cdn
                            }
                        }
                    } else {
                        let exitAvatar = isAvatar[0].dataValues.avatar;
                        let oldCDN = exitAvatar.split('/')[3];
                        await ctx.service.qiniu.deleteFile('webimg', oldCDN);
                        await isUserinfo.update({
                            avatar: cdn
                        })
                        ctx.status = 200;
                        ctx.body = {
                            success: 1,
                            data: {
                                avatar: cdn
                            }
                        }

                    }
                } else {
                    await ctx.service.mysql.create({
                        id: id,
                        avatar: cdn
                    }, table);
                    ctx.status = 200;
                    ctx.body = {
                        success: 1,
                        data: {
                            avatar: cdn
                        }
                    }
                }
            }
        } catch (err) {
            ctx.status = 500
            console.log(err)
        }
    }
    //上传用户编辑信息
    async uploadUserInfo() {
        const {
            ctx
        } = this;
        let token = ctx.header.authorization;
        try {
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                const {
                    id,
                    phone,
                    domain,
                    schoolMajor,
                    description
                } = ctx.request.body;
                let table = 'UserInfo';
                let isUserinfo = await ctx.service.mysql.findById(id, table);
                if (isUserinfo) {
                    await isUserinfo.update({
                        phone: phone,
                        school: schoolMajor[0],
                        major: schoolMajor[1],
                        domain: domain[0],
                        description: description
                    })
                    ctx.status = 200;
                    ctx.body = {
                        success: 1
                    }
                } else {
                    await ctx.service.mysql.create({
                        id: id,
                        phone: phone,
                        school: schoolMajor[0],
                        major: schoolMajor[1],
                        description: description
                    }, table)
                    ctx.status = 200;
                    ctx.body = {
                        success: 1
                    }
                }
            }
        } catch (err) {
            console.log(err)
            ctx.status = 404
        }
    }
    async getInitInfo() {
        const { ctx, app } = this;
        try {
            let token = ctx.header.authorization;
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403;
            } else {
                let { id } = ctx.request.body
                let table = 'UserInfo'
                let params = {
                    include: [
                        {
                            model: app.model.School
                        }, {
                            model: app.model.Major
                        }, {
                            model: app.model.Domain
                        }
                    ],
                    where: {
                        id: id
                    }
                }
                let result = await ctx.service.mysql.findAll(params, table)
                if (result.length != 0) {
                    ctx.status = 200
                    ctx.body = {
                        success: 1,
                        data: result[0].dataValues
                    }
                } else {
                    ctx.status = 200
                    ctx.body = {
                        success: 0
                    }
                }
            }
        } catch (err) {
            ctx.status = 404
            console.log(err)
        }
    }

}
module.exports = Person;