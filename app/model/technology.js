'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        TEXT
    } = app.Sequelize;
    const Technology = app.model.define('Technology', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        name:STRING(16),
    },
    {
        freezeTableName: true,  
        tableName: 'technology',       
        timestamps: false     
    })
    Technology.associate = function (){
        app.model.Technology.hasOne(app.model.Article,{foreignKey:'technology_id',targetKey:'id'});
    }
 
    return Technology;
}