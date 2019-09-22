'use strict';
const Controller = require('egg').Controller;
class backResourceManage extends Controller {
  async articleList() {
    const { ctx } = this;
    let result = null;
    try {
      result = await ctx.service.backArticle.articleList();
      ctx.status = 200;
      if (result) {
        ctx.body = {
          data: result,
          success: 1,
        };
      } else {
        ctx.body = {
          success: 0,
          message: '没有数据'
        };
      }
    } catch (e) {
      console.log('Error in resource Controller articleList');
      console.log(e);
      ctx.status = 404;
    }
  }
  async deleteArticle() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    let succese = false;
    try {
      console.log('执行到controller');
      succese = await ctx.service.backArticle.deleteArticle(id);
      ctx.status = 200;
      if (succese) {
        ctx.body = {
          succese: true,
          message: '删除成功',
        };
      } else {
        ctx.body = {
          succese: false,
          message: '删除失败',
        };
      }
    } catch (e) {
      console.log('Error in resource Controller deleteArticle');
      console.log(e);
      ctx.status = 404;
    }
  }
}

module.exports = backResourceManage;
