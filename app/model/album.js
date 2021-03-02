'use strict';

module.exports = app => {
  const { INTEGER, DATE, STRING } = app.Sequelize;
  const Album = app.model.define(
    'Album',
    {
      id: {
        type: INTEGER(11),
        primaryKey: true,
      },
      user_id: STRING(16),
      type: INTEGER(10),
      name: STRING(255),
      desc: STRING(255),
      cover: {
        type: INTEGER(16),
        defaultValue: 1,
      },
      status: {
        type: INTEGER(4),
        defaultValue: 1,  // 0 已删除，1 公开，2私有，
      },
      created_at: DATE,
      updated_at: DATE,
    },
    {
      freezeTableName: true,
      tableName: 'album'
    }
  );
  Album.associate = function () {
    app.model.Album.belongsTo(app.model.AlbumType, { foreignKey: 'type', targetKey: 'id' });
    app.model.Album.belongsTo(app.model.Photo, { foreignKey: 'cover', targetKey: 'id' })
  };
  return Album;
};
