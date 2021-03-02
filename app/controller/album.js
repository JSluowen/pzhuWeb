'use strict'

const Controller = require('egg').Controller;

class AlbumController extends Controller {
  async createAlbum() {
    const { ctx, app } = this
    const { name, desc, typeId } = ctx.request.body
    const userId = ctx.session.userid
    const albumTable = 'Album'
    try {
      const isExist = await ctx.service.mysql.findAll({ where: { status: 1, name, type: typeId } }, albumTable)
      if (isExist.length) {
        ctx.status = 200
        ctx.body = {
          success: 0,
          message: '相册名重复'
        }
        return
      }
      await ctx.service.mysql.create({ user_id: userId, name, desc, type: typeId }, albumTable)
      ctx.status = 200
      ctx.body = {
        success: 1,
        message: '添加成功'
      }
    } catch (error) {
      ctx.status = 500
      console.log(error)
    }
  }
  async getAlbumTypes() {
    const { ctx } = this
    const albumTypeTable = 'AlbumType'
    try {
      const albumTypes = await ctx.service.mysql.findAll({ where: { status: 1 } }, albumTypeTable)
      if (albumTypes.length > 0) {
        ctx.status = 200
        ctx.body = {
          data: {
            types: albumTypes
          }
        }
      }
    } catch (error) {
      console.log(error)
      ctx.status = 500
    }
  }
  async getAlbums() {
    const { ctx, app } = this
    const albumTable = 'Album'
    const params = {
      include: [
        {
          model: app.model.AlbumType,
          attributes: ['name']
        },

      ],
      where: {
        status: 1,
      }
    };
    try {
      const albums = await ctx.service.mysql.findAll(params, albumTable)
      if (albums.length > 0) {
        ctx.status = 200
        ctx.body = {
          data: {
            albums: albums
          }
        }
      }
    } catch (error) {
      console.log(error)
      ctx.status = 500
    }
  }
}

module.exports = AlbumController