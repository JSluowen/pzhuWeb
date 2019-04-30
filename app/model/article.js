'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, TEXT, TIME } = app.Sequelize;
    const Article = app.model.define(
        'Article',
        {
            id: {
                type: INTEGER(10),
                primaryKey: true,
                autoIncrement: true
            },
            userid: {
                type: STRING(16),
                references: {
                    model: 'UserInfo',
                },
            },
            menuid: {
                type: INTEGER(10),
                references: {
                    model: 'Menu',
                },
            },
            technologyid: {
                type: INTEGER(10),
                references: {
                    model: 'Technology',
                },
            },
            title: {
                type: STRING(64),
            },
            abstract: {
                type: STRING(128),
            },
            keywords: {
                type: STRING(64),
            },
            postlink: {
                type: STRING(128),
            },
            context: {
                type: TEXT,
            },
            time: {
                type: TIME,
            },
            readnumber: {
                type: INTEGER(10),
            },
            status: {
                type: INTEGER(4),
            },
            top: {
                type: INTEGER(4),
            },
            created_at: DATE,
            updated_at: DATE,
        },
        {
            underscored: true,
            tableName: 'article',
        }
    );
    Article.associate = function() {
        app.model.Article.hasMany(app.model.Favorite, { foreignKey: 'articleid', targetKey: 'id' });
        app.model.Article.belongsTo(app.model.User, { foreignKey: 'userid', targetKey: 'id' });
        app.model.Article.belongsTo(app.model.UserInfo, { foreignKey: 'userid', targetKey: 'id' });
        app.model.Article.belongsTo(app.model.Menu, { foreignKey: 'menuid', targetKey: 'id' });
        app.model.Article.belongsTo(app.model.Technology, { foreignKey: 'technologyid', targetKey: 'id' });
    };
    return Article;
};
