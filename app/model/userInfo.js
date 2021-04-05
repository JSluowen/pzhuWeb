'use strict'
module.exports = app => {
  const { INTEGER, DATE, STRING } = app.Sequelize
  const UserInfo = app.model.define(
    'UserInfo',
    {
      id: {
        type: STRING(16),
        primaryKey: true,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      school: {
        type: INTEGER(10),
        references: {
          model: 'School',
          key: 'id',
        },
      },
      major: {
        type: INTEGER(10),
        references: {
          model: 'Major',
          key: 'id',
        },
      },
      domain: {
        type: INTEGER(10),
        references: {
          model: 'Domain',
          key: 'id',
        },
      },
      avatar: STRING(128),
      phone: STRING(11),
      description: STRING(128),
      created_at: DATE,
      updated_at: DATE,
    },
    {
      underscored: true,
      tableName: 'user_info',
    },
  )

  UserInfo.associate = function() {
    app.model.UserInfo.hasMany(app.model.Top, { foreignKey: 'userid', targetKey: 'id' })
    app.model.UserInfo.hasMany(app.model.Media, { foreignKey: 'userid', targetKey: 'id' })
    app.model.UserInfo.hasMany(app.model.Article, { foreignKey: 'userid', targetKey: 'id' })
    app.model.UserInfo.hasMany(app.model.Resource, { foreignKey: 'userid', targetKey: 'id' })
    app.model.UserInfo.hasMany(app.model.Achievement, { foreignKey: 'userid', targetKey: 'id' })
    app.model.UserInfo.belongsTo(app.model.School, { foreignKey: 'school', targetKey: 'id' })
    app.model.UserInfo.belongsTo(app.model.Major, { foreignKey: 'major', targetKey: 'id' })
    app.model.UserInfo.belongsTo(app.model.Domain, { foreignKey: 'domain', targetKey: 'id' })
    app.model.UserInfo.belongsTo(app.model.User, { foreignKey: 'id', targetKey: 'id' })
  }
  return UserInfo
}
