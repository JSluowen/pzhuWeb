'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        TEXT
    } = app.Sequelize;
    const Domain = app.model.define('Domain', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        name:STRING(16),
    },
    {
        freezeTableName: true,  
        tableName: 'domain',       
        timestamps: false     
    })
    Domain.associate = function (){
        app.model.Domain.hasMany(app.model.UserDomain,{foreignKey:'domain_id',targetKey:'id'});
    }
 
    return Domain;
}