'use strict'
module.exports = app => {
  const {
    INTEGER,
    STRING
  } = app.Sequelize
  const Media = app.model.define('Media', {
    id: {
      type: INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: STRING(16),
      references: {
        model: 'UserInfo'
      }
    },
    articleid: {
      type: INTEGER(10),
      references: {
        model: 'Article'
      }
    },
    link: {
      type: STRING(255),
    },
    key: {
      type: STRING(128)
    },
    status: {
      type: INTEGER(4),
      defaultValue: 1
    },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'media',
  }
  )
  Media.associate = function() {
    app.model.Media.belongsTo(app.model.Article, { foreignKey: 'articleid', targetKey: 'id' })
    app.model.Media.belongsTo(app.model.UserInfo, { foreignKey: 'userid', targetKey: 'id' })
  }
  return Media
}
