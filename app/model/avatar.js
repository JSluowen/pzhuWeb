'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        TEXT
    } = app.Sequelize;
    const Avatar = app.model.define('Avatar', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        link:STRING(128),
    },
    {
        freezeTableName: true,  
        tableName: 'avatar',       
        timestamps: false     
    })
    // Avatar.associate = function (){
    //     //app.model.Avatar.hasOne(app.model.Article,{foreignKey:'menu_id',targetKey:'id'});
    // }
 
    return Avatar;
}