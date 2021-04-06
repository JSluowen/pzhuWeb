'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
  } = app.Sequelize;
  const Major = app.model.define('Major', {
    id: {
      type: INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    name: STRING(16),
    school: {
      type: INTEGER(10),
      references: {
        model: 'school',
        key: 'id'
      }
    }
  },
  {
    freezeTableName: true,
    tableName: 'major',
    timestamps: false
  });
  Major.associate = function() {
    app.model.Major.hasMany(app.model.UserInfo, { foreignKey: 'major', targetKey: 'id' });
    app.model.Major.belongsTo(app.model.School, { foreignKey: 'school', targetKey: 'id' });
  };

  return Major;
};
