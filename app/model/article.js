'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        TEXT
    } = app.Sequelize;
    const Article = app.model.define('Article', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        user_id:INTEGER(10),
        menu_id:INTEGER(10),
        technology_id:INTEGER(10),
        keywords:STRING(64),
        poster_link:STRING(128),
        title:STRING(64),
        abstract:STRING(128),
        content:TEXT,
        publish_time:DATE,
        read_number:INTEGER,
        status:INTEGER(4),
        top:INTEGER(4),

    },
    {
        freezeTableName: true,  
        tableName: 'article',       
        timestamps: false     
    })
    Article.associate = function (){
        app.model.Annoucement.hasOne(app.model.Favorite,{foreignKey:'article_id'});
        
        app.model.Article.belongsTo(app.model.User,{foreignKey:'user_id',targetKey:'id'});
        app.model.Article.belongsTo(app.model.Menu,{foreignKey:'menu_id',targetKey:'id'});
        app.model.Article.belongsTo(app.model.Technology,{foreignKey:'technology_id',targetKey:'id'});
    }
 
    return Article;
}