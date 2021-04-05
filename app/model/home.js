'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const Home = app.model.define(
    'Home',
    {
      id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: STRING(255),
      },
      desc: {
        type: STRING(255),
      },
      order: {
        type: INTEGER(10)
      },
      cover: {
        type: STRING(255)
      },
      status: {
        type: INTEGER(4)
      },

      created_at: DATE,
      updated_at: DATE,
    },
    {
      underscored: true,
      tableName: 'home',
    },
  )
  return Home
}
