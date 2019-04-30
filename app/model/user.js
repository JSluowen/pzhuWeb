'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING
    } = app.Sequelize;
    const User = app.model.define('user', {
        id: {
            type: STRING(16),
            primaryKey: true
        },
        password: STRING(32),
        name: STRING(16),
        email: STRING(32),
        status: {
            type: INTEGER(4),
            defaultValue: 0
        },
        created_at: DATE,
        updated_at: DATE,
    },
    {
        freezeTableName: true,  
        tableName: 'user',       
        timestamps: false     
    })
    User.associate = function (){
        app.model.User.hasOne(app.model.UserInfo,{foreignKey:'id'});
        app.model.User.hasMany(app.model.Achievement,{foreignKey:'user_id',targetKey:'id'});
        app.model.User.hasMany(app.model.Favorite,{foreignKey:'user_id',targetKey:'id'});
        app.model.User.hasMany(app.model.Article,{foreignKey:'user_id',targetKey:'id'});
        app.model.User.hasMany(app.model.UserDomain,{foreignKey:'user_id',targetKey:'id'});
    }

    return User;
}
