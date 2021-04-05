'use strict'

const path = require('path')

function linkTpl({ url }) {
  return `<link rel="stylesheet" href="${url}"></link>`
}

function scriptTpl({ url }) {
  return `<script src="${url}"></script>`
}

function getURL(that, entry, type) {
  const isLocal = that.app.config.env === 'local'
  let urlpath = entry
  if (!isLocal) {
    const manifestPath = path.join(that.app.config.baseDir, `config/version_${type}.json`)
    const manifest = require(manifestPath)
    urlpath = manifest[urlpath]
  }
  return `/public/${isLocal ? 'local' : 'build'}/${type}/${urlpath}`
}

module.exports = {
  getStyle(entry) {
    return linkTpl({ url: getURL(this, entry, 'css') })
  },

  getScript(entry) {
    return scriptTpl({ url: getURL(this, entry, 'js') })
  },
}
