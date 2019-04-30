'use strict';
module.exports = app => {
    const { INTEGER, STRING, DATE } = app.Sequelize;
    const Menu = app.model.define(
        'menu',
        {
            id: {
                type: INTEGER(10),
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: STRING(16),
            },
            created_at: DATE,
            updated_at: DATE,
        },
        {
            underscored: true,
            tableName: 'menu',
        },
    );

    Menu.associate = function() {
        app.model.Menu.hasMany(app.model.Article, { foreignKey: 'menuid', targetKey: 'id' });
    };
    return Menu;
};
