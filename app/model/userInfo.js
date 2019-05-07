'use strict';
module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING
    } = app.Sequelize;
    const UserInfo = app.model.define('UserInfo', {
        id: {
            type: STRING(16),
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        school_id:{
            type:INTEGER(10),
            references:{    
                model:'school', 
                key:'id'
            }
        },
        major_id: {
            type:INTEGER(10),
            references:{    
                model:'major',
                key:'id'
            }
        },
        avatar: STRING(128),
        phone: STRING(11),
        description: STRING(128),
        created_at: DATE,
        updated_at: DATE,
    },{
        freezeTableName: true,  
        tableName: 'user_info',       
        timestamps: false   
    })
    UserInfo.associate = function  (){
        app.model.UserInfo.belongsTo(app.model.User,{foreignKey:'id',targetKey:'id'});
        app.model.UserInfo.belongsTo(app.model.Major,{foreignKey:'major_id',targetKey:'id'});
        app.model.UserInfo.belongsTo(app.model.School,{foreighKey:'school_id',targetKey:'id'});
        app.model.UserInfo.hasMany(app.model.Article,{foreignKey:'user_id',targetKey:'id'});
        app.model.UserInfo.hasMany(app.model.Achievement,{foreignKey:'user_id',targetKey:'id'});
        app.model.UserInfo.hasMany(app.model.Favorite,{foreignKey:'user_id',targetKey:'id'});
        app.model.UserInfo.hasMany(app.model.UserDomain,{foreignKey:'user_id',targetKey:'id'});
    }
    return UserInfo;
}
