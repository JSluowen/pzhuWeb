'use strict'

const Controller = require('egg').Controller

class AchievementIssue extends Controller {
  async getAchievementIssue() {
    const { ctx, app } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        const { id } = ctx.request.body
        const userid = ctx.session.userid
        const table = 'AchievementType'
        const table1 = 'Achievement'
        const params = {
          include: [
            {
              model: app.model.AchievementType
            }
          ],
          where: {
            userid,
            status: 2
          }
        }
        const params1 = {
          where: {
            id,
            userid
          }
        }
        const params2 = {
          where: {
            status: 1
          }
        }
        const achievementType = await ctx.service.mysql.findAll(params2, table)
        let achievement
        if (id === '') {
          achievement = await ctx.service.mysql.findAll(params, table1)
        } else {
          achievement = await ctx.service.mysql.findAll(params1, table1)
        }

        if (achievement.length === 0) {
          ctx.status = 200
          ctx.body = {
            success: 1,
            data: achievementType
          }
        } else {
          ctx.status = 200
          ctx.body = {
            success: 0,
            data: {
              achievementType,
              achievement
            }
          }
        }

      }
    } catch (err) {
      ctx.status = 404
      console.log(err)
    }
  }
  async uploadAchievement() {
    const { ctx } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        let { id, userid, title, achievementlink, abstract, type, status, date } = ctx.request.body
        id = parseInt(id)
        const created_at = new Date(date)
        const table = 'Achievement'
        const params = {
          userid,
          title,
          achievementlink,
          typeid: parseInt(type),
          abstract,
          status: 1,
          created_at,
        }
        if (parseInt(status) === 1) {
          await ctx.service.mysql.create(params, table)
        } else {
          const achievement = await ctx.service.mysql.findById(id, table)
          await achievement.update(params)
        }
        ctx.status = 200
        ctx.body = {
          success: 1,
        }
      }
    } catch (err) {
      console.log(err)
      ctx.status = 404
    }
  }
  async uploadAchievementCover() {
    const { ctx } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        let { id, userid, key, status } = ctx.request.body
        id = parseInt(id)
        const posterlink = await ctx.service.qiniu.getCDN(key)
        const table = 'Achievement'
        const params = {
          userid,
          posterlink,
          status: 2
        }
        let achievement
        if (parseInt(status) === 1) {
          achievement = await ctx.service.mysql.create(params, table)
        } else {
          achievement = await ctx.service.mysql.findById(id, table)
          await achievement.update(params)
        }
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
  async delAchievementCover() {
    const { ctx } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        const { id, posterlink } = ctx.request.body
        const arry = posterlink.split('/')
        const key = arry[arry.length - 1]
        const table = 'Achievement'
        const params = {
          posterlink: ''
        }
        const achievement = await ctx.service.mysql.findById(id, table)
        await achievement.update(params)
        await ctx.service.qiniu.deleteFile('webimg', key)
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
  async uploadAchievementAttachment() {
    const { ctx } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        let { id, userid, key, status } = ctx.request.body
        id = parseInt(id)
        const attachment = await ctx.service.qiniu.getCDN(key)
        const table = 'Achievement'
        const params = {
          userid,
          attachment,
          status: 2
        }
        let achievement
        if (parseInt(status) === 1) {
          achievement = await ctx.service.mysql.create(params, table)
        } else {
          achievement = await ctx.service.mysql.findById(id, table)
          await achievement.update(params)
        }
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
  async delAchievementAttachment() {
    const { ctx } = this
    try {
      const token = ctx.header.authorization
      const author = await ctx.service.jwt.verifyToken(token)
      if (!author) {
        ctx.status = 403
      } else {
        let { id, attachment } = ctx.request.body
        id = parseInt(id)
        const arry = attachment.split('/')
        const key = arry[arry.length - 1]
        const table = 'Achievement'
        const params = {
          attachment: ''
        }
        const achievement = await ctx.service.mysql.findById(id, table)
        await achievement.update(params)
        await ctx.service.qiniu.deleteFile('webimg', key)
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
module.exports = AchievementIssue
