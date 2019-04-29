'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE } = app.Sequelize;
    const Favorite = app.model.define(
        'Favorite',
        {
            id: {
                type: INTEGER(10),
                primaryKey: true,
            },
            userid: {
                type: STRING(16),
            },
            articleid: {
                type: INTEGER(10),
                references: {
                    model: 'Article',
                },
            },
            created_at: DATE,
            updated_at: DATE,
        },
        {
            underscored: true,
            tableName: 'favorite',
        },
    );

    Favorite.associate = function() {
        app.model.Favorite.belongsTo(app.model.Article, { foreignKey: 'articleid', targetKey: 'id' });
    };

    return Favorite;
};
