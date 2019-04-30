'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        TEXT
    } = app.Sequelize;
    const Favorite = app.model.define('Favorite', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        user_id:STRING(16),
        article_id:INTEGER(10),
    },
    {
        freezeTableName: true,  
        tableName: 'favorite',       
        timestamps: false     
    })
    Favorite.associate = function (){
        app.model.Favorite.belongsTo(app.model.User,{foreignKey:'user_id',targetKey:'id'});
        app.model.Favorite.belongsTo(app.model.Article,{foreignKey:'article_id',targetKey:'id'})
        //app.model.Domain.hasOne(app.model.Article,{foreignKey:'menu_id',targetKey:'id'});
    }
 
    return Favorite;
}