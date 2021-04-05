'use strict'

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    BOOLEAN
  } = app.Sequelize
  const Resource = app.model.define('Resource', {
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
    typeid: {
      type: INTEGER(10),
      references: {
        model: 'ResourceType'
      }
    },
    title: {
      type: STRING(64)
    },
    description: {
      type: STRING(128)
    },
    posterlink: {
      type: STRING(128)
    },
    link: {
      type: STRING(128)
    },
    attachment: {
      type: STRING(128)
    },
    status: {
      type: BOOLEAN(4),
      defaultValue: 1
    },
    created_at: DATE,
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'resource',
  }
  )

  Resource.associate = function() {
    app.model.Resource.belongsTo(app.model.ResourceType, { foreignKey: 'typeid', targetKey: 'id' })
    app.model.Resource.belongsTo(app.model.UserInfo, { foreignKey: 'userid', targetKey: 'id' })
  }
  return Resource
}
