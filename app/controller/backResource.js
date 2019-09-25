'use strict';

const Controller = require('egg').Controller;

class Resource extends Controller {
  async getResourceInfo() {
    const { ctx, app } = this;
    try {
      const token = ctx.header.authorization;
      const author = await ctx.service.jwt.verifyToken(token);
      if (!author) {
        ctx.status = 403;
      } else {
        let { page, pageSize, tgaId } = ctx.request.body;
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        tgaId = parseInt(tgaId);
        const table = 'Resource';
        const table1 = 'ResourceType';
        let params;
        let params1;
        if (tgaId === 0) {
          params = {
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
                model: app.model.ResourceType
              }
            ],
            where: {
              status: 1
            },
            attributes: ['id', 'title', 'link', 'attachment', 'created_at'],
            order: [['created_at', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize,
          };
          params1 = {
            where: {
              status: 1
            }
          };
        } else {
          params = {
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
                model: app.model.ResourceType
              }
            ],
            where: {
              status: 1,
              typeid: tgaId
            },
            attributes: ['id', 'title', 'link', 'attachment', 'created_at'],
            order: [['created_at', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize,
          };
          params1 = {
            where: {
              status: 1,
              typeid: tgaId
            }
          };
        }
        const params2 = {
          where: {
            status: 1
          }
        };
        const resource = await ctx.service.mysql.findAll(params, table);
        const allResource = await ctx.service.mysql.findAll(params1, table);
        const total = allResource.length;
        const tag = await ctx.service.mysql.findAll(params2, table1);
        ctx.status = 200;
        ctx.body = {
          success: 1,
          data: {
            resource,
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
  async delResource() {
    const { ctx } = this;
    try {
      const token = ctx.header.authorization;
      const author = await ctx.service.jwt.verifyToken(token);
      if (!author) {
        ctx.status = 403;
      } else {
        const { id } = ctx.request.body;
        const table = 'Resource';
        const resource = await ctx.service.mysql.findById(id, table);
        await resource.update({ status: 0 });
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
  async addResourceTag() {
    const { ctx } = this;
    try {
      const token = ctx.header.authorization;
      const author = await ctx.service.jwt.verifyToken(token);
      if (!author) {
        ctx.status = 403;
      } else {
        const { tagName } = ctx.request.body;
        const table = 'ResourceType';
        const params = {
          where: {
            name: tagName
          }
        };
        const isTag = await ctx.service.mysql.findAll(params, table);
        if (isTag.length !== 0) {
          // 标签已存在
          if (isTag[0].dataValues.status === 1) {
            ctx.status = 200;
            ctx.body = {
              success: 0,
              message: '标签已存在'
            };
            // 标签恢复
          } else if (isTag[0].dataValues.status === 0) {
            await isTag[0].update({ status: 1 });
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
  async delResourceTag() {
    const { ctx } = this;
    try {
      const token = ctx.header.authorization;
      const author = await ctx.service.jwt.verifyToken(token);
      if (!author) {
        ctx.status = 403;
      } else {
        const { tagid } = ctx.request.body;
        const table = 'ResourceType';
        const resource = await ctx.service.mysql.findById(tagid, table);
        await resource.update({ status: 0 });
        ctx.status = 200;
        ctx.body = {
          success: 1,
          data: resource
        };
      }
    } catch (err) {
      console.log(err);
      ctx.status = 404;
    }
  }
  async onSerachResource() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    try {
      const token = ctx.header.authorization;
      const author = await ctx.service.jwt.verifyToken(token);
      if (!author) {
        ctx.status = 403;
      } else {
        const { value } = ctx.request.body;
        const table = 'Resource';
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
              model: app.model.ResourceType
            }
          ],
          where: {
            status: 1,
            title: {
              [Op.like]: '%' + value + '%',
            }
          },
          attributes: ['id', 'title', 'link', 'attachment', 'created_at'],
          order: [['created_at', 'DESC']],
        };
        const achievement = await ctx.service.mysql.findAll(params, table);
        ctx.status = 200;
        ctx.body = {
          success: 1,
          data: achievement
        };
      }
    } catch (err) {
      console.log(err);
      ctx.status = 404;
    }
  }
}
module.exports = Resource;
