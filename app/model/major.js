'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        TEXT
    } = app.Sequelize;
    const Major = app.model.define('Major', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        name:STRING(16),
        school_id:{
            type:INTEGER(10),
            references:{    
                model:'school',
                key:'id'
            }
        }
    },
    {
        freezeTableName: true,  
        tableName: 'major',       
        timestamps: false     
    })
    Major.associate = function(){
        app.model.Major.hasMany(app.model.UserInfo,{foreignKey:'major_id',targetKey:'id'});
        app.model.Major.belongsTo(app.model.School,{foreignKey:'school_id',targetKey:'id'});
    }
 
    return Major;
}