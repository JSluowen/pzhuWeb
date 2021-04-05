'use strict'

const Service = require('egg').Service

class Fun extends Service {
  // 格式化学院专业的数据
  async getSchool(data) {
    function foo(data) {
      const node = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].dataValues.Majors) {
          node.push({
            value: data[i].dataValues.id,
            label: data[i].dataValues.name,
            children: foo(data[i].dataValues.Majors),
          })
        } else {
          node.push({
            value: data[i].dataValues.id,
            label: data[i].dataValues.name,
          })
        }
      }
      return node
    }
    return foo(data)
  }
  // 过虑资源分类所对应的数目
  async filterTypeNum(Type, data) {
    return Type.map(item => {
      let num = 0
      for (const val of data) {
        if (parseInt(item.id) === parseInt(val.typeid)) {
          num++
        }
      }
      item.dataValues.index = num
      return item
    })
  }
  // 过滤资源所对应的类别
  async filterType(data, index) {
    return data.filter(item => {
      return item.dataValues.typeid === parseInt(index)
    })
  }
  // 筛选用户对应的收藏文章
  async filterCollect(favorite, article) {
    if (favorite.length !== 0) {
      for (const i of article) {
        for (const j of favorite) {
          if (parseInt(j.dataValues.articleid) === parseInt(i.dataValues.id)) {
            i.dataValues.isFavorite = true
            break
          } else {
            i.dataValues.isFavorite = false
          }
        }
      }
    } else {
      for (const i of article) {
        i.dataValues.isFavorite = false
      }
    }

    return article
  }
}

module.exports = Fun
