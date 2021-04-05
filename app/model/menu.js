'use strict'
module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
  const Menu = app.model.define(
    'Menu',
    {
      id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING(16),
      },
      status: {
        type: INTEGER(1),
        defaultValue: 1,
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'menu',
    },
  )
  Menu.associate = function() {
    app.model.Menu.hasMany(app.model.Article, { foreignKey: 'menuid', targetKey: 'id' })
  }
  return Menu
}
