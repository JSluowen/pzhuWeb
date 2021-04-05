'use strict'

const Controller = require('egg').Controller

class Achievement extends Controller {
  async getAchievementInfo() {
    const { ctx, app } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        let { page, pageSize, tagId } = ctx.request.body
        page = parseInt(page)
        pageSize = parseInt(pageSize)
        tagId = parseInt(tagId)
        const table = 'Achievement'
        const table1 = 'AchievementType'
        let params
        let params1
        if (tagId === 0) {
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
                model: app.model.AchievementType
              }
            ],
            where: {
              status: 1
            },
            attributes: ['id', 'title', 'achievementlink', 'show', 'attachment', 'created_at'],
            order: [['created_at', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize,
          }
          params1 = {
            where: {
              status: 1
            }
          }
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
                model: app.model.AchievementType
              }
            ],
            where: {
              status: 1,
              typeid: tagId
            },
            attributes: ['id', 'title', 'achievementlink', 'show', 'attachment', 'created_at'],
            order: [['created_at', 'DESC']],
            limit: pageSize,
            offset: (page - 1) * pageSize,
          }
          params1 = {
            where: {
              status: 1,
              typeid: tagId
            }
          }
        }
        const params2 = {
          where: {
            status: 1
          }
        }
        const achievement = await ctx.service.mysql.findAll(params, table)
        const allAchievement = await ctx.service.mysql.findAll(params1, table)
        const total = allAchievement.length
        const tag = await ctx.service.mysql.findAll(params2, table1)
        ctx.status = 200
        ctx.body = {
          success: 1,
          data: {
            achievement,
            total,
            tag
          }
        }
      }
    } catch (err) {
      console.log(err)
      ctx.status = 404
    }
  }
  async delAchievement() {
    const { ctx } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        const { id } = ctx.request.body
        const table = 'Achievement'
        const achievement = await ctx.service.mysql.findById(id, table)
        await achievement.update({ status: 0 })
        ctx.status = 200
        ctx.body = {
          success: 1
        }
      }
    } catch (err) {
      console.log(err)
      ctx.status = 404
    }
  }
  async addAchievementTag() {
    const { ctx } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        const { tagName } = ctx.request.body
        const table = 'AchievementType'
        const params = {
          where: {
            name: tagName
          }
        }
        const isTag = await ctx.service.mysql.findAll(params, table)
        if (isTag.length !== 0) {
          // 标签已存在
          if (isTag[0].dataValues.status === 1) {
            ctx.status = 200
            ctx.body = {
              success: 0,
              message: '标签已存在'
            }
            // 标签恢复
          } else if (isTag[0].dataValues.status === 0) {
            await isTag[0].update({ status: 1 })
            ctx.status = 200
            ctx.body = {
              success: 1
            }
          }
        } else {
          await ctx.service.mysql.create({ name: tagName }, table)
          ctx.status = 200
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
  async delAchievementTag() {
    const { ctx } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        const { tagid } = ctx.request.body
        const table = 'AchievementType'
        const resource = await ctx.service.mysql.findById(tagid, table)
        await resource.update({ status: 0 })
        ctx.status = 200
        ctx.body = {
          success: 1,
          data: resource
        }
      }
    } catch (err) {
      console.log(err)
      ctx.status = 404
    }
  }
  async onSerachAchievement() {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        const { value } = ctx.request.body
        const table = 'Achievement'
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
              model: app.model.AchievementType
            }
          ],
          where: {
            status: 1,
            title: {
              [Op.like]: '%' + value + '%',
            }
          },
          attributes: ['id', 'title', 'achievementlink', 'attachment', 'created_at'],
          order: [['created_at', 'DESC']],
        }
        const achievement = await ctx.service.mysql.findAll(params, table)
        ctx.status = 200
        ctx.body = {
          success: 1,
          data: achievement
        }
      }
    } catch (err) {
      console.log(err)
      ctx.status = 404
    }
  }
  async isShow() {
    const { ctx } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        const { id, checked } = ctx.request.body
        const table = 'Achievement'
        const ach = await ctx.service.mysql.findById(id, table)
        if (checked === 'true') {
          await ach.update({ show: 1 })
        } else {
          await ach.update({ show: 0 })
        }
        ctx.status = 200
        ctx.body = {
          success: 1
        }
      }
    } catch (err) {
      console.log(err)
      ctx.status = 404
    }
  }
}
module.exports = Achievement
