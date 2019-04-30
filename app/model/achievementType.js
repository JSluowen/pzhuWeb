'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING
    } = app.Sequelize;
    const AchievementType = app.model.define('AchievementType', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        name: STRING(16),
    },
    {
        freezeTableName: true,  
        tableName: 'achievement_type',       
        timestamps: false     
    })
    AchievementType.associate = function (){
        app.model.AchievementType.hasOne(app.model.Achievement,{foreignKey:'type_id'});
    }

    return AchievementType;
}
