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
  async updateAlbum() {
    const { ctx } = this
    const { userid } = ctx.session
    const { id, type, name, desc, cover } = ctx.params

    try {
      const album = await ctx.service.mysql.findById(id, 'Album')
      await album.update({ user_id: userid, type, name, desc, cover })
      ctx.status = 200
      ctx.body = {
        success: 1,
        message: '修改成功'
      }
    } catch (error) {
      ctx.status = 500
    }
  }
  async getAlbums() {
    const { ctx, app } = this
    const { type } = ctx.params
    const albumTable = 'Album'
    const params = {
      include: [
        {
          model: app.model.AlbumType,
          attributes: ['name']
        },
        {
          model: app.model.Photo,
          attributes: ['link'],
        }
      ],
      where: {
        status: ctx.session.userid ? { ne: 0 } : 1,
        type: type || { ne: 0 }
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
  async delAlbum() {

  }
  async createAlbumType() {
    const { ctx } = this
    const { name } = this.params
    try {
      await ctx.service.mysql.create({ name }, 'AlbumType')
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

  async uploadPhotos() {
    const { ctx } = this
    const { albumId, imgs } = ctx.request.body
    const user_id = ctx.session.userid

    try {
      await ctx.service.mysql.createList(imgs.map(img => ({ user_id, album_id: albumId, link: img.link, name: img.name })), 'Photo')
      ctx.status = 200
      ctx.body = {
        success: 1,
        message: '上传成功'
      }
    } catch (error) {
      ctx.status = 500
      console.log(error)
    }
  }
  async getPhotosByAlbumId() {
    const { ctx, app } = this
    const { id } = ctx.params
    const params = {
      include: [
        {
          model: app.model.Photo,
          attributes: ['link'],
        }
      ],
      where: {
        id,
        status: { ne: 0 },
      }
    }
    try {
      const photos = await ctx.service.mysql.findAll({ where: { status: 1, album_id: id } }, 'Photo')
      let albumInfo = await ctx.service.mysql.findAll(params, 'Album')
      ctx.status = 200
      ctx.body = {
        success: 1,
        data: {
          photos,
          albumInfo: {
            ...albumInfo[0]?.dataValues,
            cover: albumInfo[0]?.dataValues?.Photo?.link
          },
        }
      }
    } catch (error) {
      ctx.status = 500
      console.log(error)
    }
  }
  async delPhoto() {
    const { ctx, app } = this
    const { id } = ctx.params

  }
}

module.exports = AlbumController