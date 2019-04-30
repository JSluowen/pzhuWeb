'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
    } = app.Sequelize;
    const Achievement = app.model.define('Achievement', {
        id: {
            type: INTEGER(10),
            primaryKey: true
        },
        name: STRING(16),
        user_id:STRING(16),
        title:STRING(64),
        type_id:INTEGER(10),
        abstract:STRING(128),
        poster_link:STRING(128),
        achievement_link:STRING(128),
        attachment:STRING(128),
        publish_time:DATE,
        status:STRING(4),
        
    },
    {
        freezeTableName: true,  
        tableName: 'achievement',       
        timestamps: false     
    })
    Achievement.associate = function (){
        app.model.Achievement.belongsTo(app.model.AchievementType,{foreignKey:'type_id',targetKey:'id'});
        app.model.Achievement.belongsTo(app.model.User,{foreignKey:'user_id',targetKey:"id"});
    }

    return Achievement;
}