'use strict'

const Controller = require('egg').Controller

class Home extends Controller {
  async getHomeInfo() {
    const { ctx, app } = this
    try {
      const table = 'Achievement'// 获取团队的成果
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
          }
        ],
        order: [['created_at', 'DESC']],
        where: {
          show: 1,
          status: 1
        }
      }
      const ac = await ctx.service.mysql.findAll(params, table)
      const baseInfo = await ctx.service.mysql.findAll({}, 'Home')
      ctx.status = 200
      ctx.body = {
        success: 1,
        data: {
          ac,
          baseInfo,
        }
      }
    } catch (err) {
      console.log(err)
      ctx.status = 404
    }
  }
  async updateHomeInfo() {
    const { ctx } = this
    const { id, title, desc, cover } = ctx.params

    try {
      const home = await ctx.service.mysql.findById(id, 'Home')
      if (!home) throw new Error()
      home.update({ title, desc, cover })
      ctx.status = 200
      ctx.body = {
        success: 1,
        message: '修改成功'
      }
    } catch (error) {
      ctx.status = 500
    }
  }
}

module.exports = Home
