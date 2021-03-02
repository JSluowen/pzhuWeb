'use strict';

module.exports = app => {
  const { INTEGER, DATE, STRING } = app.Sequelize;
  const Photo = app.model.define(
    'Photo',
    {
      id: {
        type: INTEGER(16),
        primaryKey: true,
      },
      user_id: STRING(16),
      album_id: INTEGER(16),
      link: STRING(255),
      name: STRING(255),
      status: {
        type: INTEGER(4),
        defaultValue: 1,
      },
      created_at: DATE,
      updated_at: DATE,
    },
    {
      freezeTableName: true,
      tableName: 'photo'
    }
  );
//   Photo.associate = function() {
//     app.model.User.hasMany(app.model.UserInfo, { foreignKey: 'id', targetKey: 'id' });
//   };
  return Photo;
};
