'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        TEXT
    } = app.Sequelize;
    const School = app.model.define('school', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        name:STRING(16),
    },
    {
        freezeTableName: true,  
        tableName: 'school',       
        timestamps: false     
    })
    School.associate = function (){
        app.model.School.hasMany(app.model.UserInfo,{foreignKey:'school_id',targetKey:'id'});
        app.model.School.hasMany(app.model.Major,{foreignKey:'school_id',targetKey:'id'});
    }
 
    return School;
}