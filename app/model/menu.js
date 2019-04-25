'use strict';

module.exports = app => {
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
        },
        created_at: DATE,
        updated_at: DATE,
    })

    Menu.associate = function(){
        app.model.Menu.hasMany(app.model.Article,{foreignKey:'menuid',targetKey:'id'})
    }
    return Menu
}