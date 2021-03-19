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
      const photos = await ctx.service.mysql.findAll({ where: { status: { ne: 0 } } }, 'Photo')
      const photoNum = photos.reduce((result, photo) => {
        if (!result[photo.album_id]) {
          result[photo.album_id] = 0
        }
        result[photo.album_id]++
        return result
      }, {})
      if (albums.length > 0) {
        ctx.status = 200
        ctx.body = {
          data: {
            albums: albums,
            photoNum,
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
  async updateAlbumCover() {
    const { ctx } = this
    const { id } = ctx.params
    const albumId = Number(ctx.params.albumId)

    try {
      const photo = await ctx.service.mysql.findById(id, 'Photo')
      if (photo.album_id !== albumId) {
        throw { status: 400 }
      }
      const album = await ctx.service.mysql.findById(albumId, 'Album')
      album.update({ cover: id })
      ctx.status = 200
      ctx.body = {
        success: 1,
        message: '修改成功'
      }
    } catch (error) {
      ctx.status = error?.status || 500
      ctx.body = error?.body || ''
    }
  }
  async createAlbumType() {
    const { ctx } = this
    const { name } = ctx.params
    try {
      const types = await ctx.service.mysql.findAll({ where: { status: { ne: 0 } } }, 'AlbumType')
      if (types.findIndex(type => type.name === name) !== -1) {
        throw {
          status: 200,
          body: {
            success: 0,
            message: '重名标签'
          }
        }
      }
      await ctx.service.mysql.create({ name }, 'AlbumType')
      ctx.status = 200
      ctx.body = {
        success: 1,
        message: '添加成功'
      }
    } catch (error) {
      ctx.status = error?.status || 500
      ctx.body = error?.body || ''
    }
  }
  async delAlbumType() {
    const { ctx } = this
    const id = Number(ctx.params.id)
    let transaction = null
    try {
      transaction = await ctx.model.transaction();
      if (id === 1) {
        throw {
          status: 200, body: {
            success: 0,
            message: '无法删除默认分类'
          }
        }
      }
      const belongAlbums = await ctx.service.mysql.findAll({ where: { status: { ne: 0 }, type: id } }, 'Album')
      await belongAlbums.forEach(async (album) => await album.update({ type: 1 }))
      const type = await ctx.service.mysql.findById(id, 'AlbumType')
      type.update({ status: 0 })
      await transaction.commit();
      ctx.status = 200
      ctx.body = {
        success: 1,
        message: '删除成功'
      }
    } catch (error) {
      await transaction.rollback();
      ctx.status = error?.status || 500
      ctx.body = error?.body || ''
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
      let albumInfo = await ctx.service.mysql.findAll(params, 'Album')
      if (albumInfo[0]?.dataValues.status === 2 && !ctx.session.userid) {
        throw { status: 403 }
      }
      const photos = await ctx.service.mysql.findAll({ where: { status: 1, album_id: id } }, 'Photo')
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
      ctx.status = error.status || 500
      console.log(error)
    }
  }
  async delPhotos() {
    const { ctx } = this
    const { ids } = ctx.params

    let transaction = null
    try {
      transaction = await ctx.model.transaction();
      const photos = await ctx.service.mysql.findAll({ where: { id: { in: ids } } }, 'Photo')
      await photos.forEach(async (photo) => await photo.update({ status: 0 }))
      ctx.status = 200
      ctx.body = {
        success: 1,
        message: '删除成功'
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      ctx.status = error?.status || 500
      ctx.body = error?.body || ''
    }
  }
  async updatePhotos() {
    const { ctx, app } = this
    let { ids, albumId } = ctx.params

    let transaction = null
    try {
      ids = ids.map(id => {
        if (isNaN(Number(id))) {
          throw { status: 200, body: { success: 0, message: '恶意请求' } }
        }
        return Number(id)
      })
      transaction = await ctx.model.transaction();
      const album = await ctx.service.mysql.findById(albumId, 'Album')
      if (album.length === 0) throw { status: 200, body: { success: 0, message: '指定相册不存在' } }
      const photos = await ctx.service.mysql.findAll({ where: { id: { in: ids } } }, 'Photo')
      await photos.forEach(async (photo) => await photo.update({ album_id: albumId }))
      ctx.status = 200
      ctx.body = {
        success: 1,
        message: '转移成功'
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      ctx.status = error?.status || 500
      ctx.body = error?.body || ''
    }
  }
}

module.exports = AlbumController