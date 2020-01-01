'use strict';
const Controller = require('egg').Controller;

class Game_2048 extends Controller {
  async initTop() {
    const { ctx, app } = this;
    try {
      const table = 'Top';
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
        order: [['best_score', 'DESC']],
      };
      const res = await ctx.service.mysql.findAll(params, table);
      ctx.status = 200;
      ctx.body = {
        data: res,
        success: 1
      };
    } catch (err) {
      ctx.status = 404;
      console.log(err);
    }
  }
}

module.exports = Game_2048;
