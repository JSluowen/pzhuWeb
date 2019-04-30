'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        TEXT
    } = app.Sequelize;
    const Menu = app.model.define('Menu', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        name:STRING(16),
    },
    {
        freezeTableName: true,  
        tableName: 'menu',       
        timestamps: false     
    })
    Menu.associate = function (){
        app.model.Menu.hasOne(app.model.Article,{foreignKey:'menu_id',targetKey:'id'});
    }
 
    return Menu;
}