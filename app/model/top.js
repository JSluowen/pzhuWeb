'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
  } = app.Sequelize;
  const Top = app.model.define('Avatar', {
    id: {
      type: INTEGER(5),
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: STRING(16),
      references: {
        model: 'UserInfo',
      },
    },
    best_score: {
      type: STRING(10)
    }
  },
  {
    freezeTableName: true,
    tableName: 'top',
    timestamps: false
  });
  Top.associate = function() {
    app.model.Top.belongsTo(app.model.UserInfo, { foreignKey: 'userid', targetKey: 'id' });
  };
  return Top;
};
