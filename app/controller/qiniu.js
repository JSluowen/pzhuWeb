'use strict'
const Controller = require('egg').Controller

class Qiniu extends Controller {
  async getToken() {
    const { ctx } = this
    try {
      const uploadToken = await ctx.service.qiniu.getToken('webimg')
      ctx.status = 200
      ctx.body = {
        data: uploadToken,
      }
    } catch (err) {
      ctx.status = 500
      console.log(err)
    }
  }
  async delFile() {
    const { key } = this.ctx.request
    try {
      await this.ctx.service.qiniu.deleteFile('wbimg', key)
      this.ctx.status = 200
      this.ctx.body = {
        success: 1,
      }
    } catch (error) {
      this.ctx.status = 200
      this.ctx.body = {
        success: 0,
      }
    }

  }
}
module.exports = Qiniu
