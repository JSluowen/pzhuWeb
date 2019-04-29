'use strict';

module.exports = app => {
<<<<<<< HEAD
    const {
        INTEGER,
        STRING,
        DATE
    } = app.Sequelize;
    const Menu = app.model.define('Menu', {
        id: {
            type: INTEGER(10),
            primaryKey: true
        },
        name: {
            type: STRING(16)
=======
    const { INTEGER, STRING, DATE } = app.Sequelize;
    const Menu = app.model.define(
        'menu',
        {
            id: {
                type: INTEGER(10),
                primaryKey: true,
            },
            name: {
                type: STRING(16),
            },
            created_at: DATE,
            updated_at: DATE,
>>>>>>> feature/member
        },
        {
            underscored: true,
            tableName: 'menu',
<<<<<<< HEAD
        }
    )
=======
        },
    );
>>>>>>> feature/member

    Menu.associate = function() {
        app.model.Menu.hasMany(app.model.Article, { foreignKey: 'menuid', targetKey: 'id' });
    };
    return Menu;
};
