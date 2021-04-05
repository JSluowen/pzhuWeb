'use strict'

module.exports = app => {
  const {
    INTEGER,
    STRING,
  } = app.Sequelize
  const Banner = app.model.define('Banner', {
    id: {
      type: INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    title: STRING(64),
    description: STRING(255),
    link: STRING(128),
    prior: INTEGER(4),
  },
  {
    freezeTableName: true,
    tableName: 'banner',
    timestamps: false
  })
  return Banner
}
