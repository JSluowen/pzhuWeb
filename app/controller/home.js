'use strict';

const Controller = require('egg').Controller;

class Home extends Controller {
  async getHomeInfo() {
    const { ctx, app } = this;
    try {
      const table = 'Achievement';// 获取团队的成果
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
      };
      const ac = await ctx.service.mysql.findAll(params, table);
      ctx.status = 200;
      ctx.body = {
        success: 1,
        data: ac
      };
    } catch (err) {
      console.log(err);
      ctx.status = 404;
    }
  }
}

module.exports = Home;
