'use strict';
module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING
    } = app.Sequelize;
    const UserInfo = app.model.define('userinfo', {
        id: {
            type: STRING(16),
            primaryKey: true,
            references: { 
                model: 'user',
                key: 'id'
            }
        },
        school:{
            type:INTEGER(10),
            references:{    
                model:'school',
                key:'id'
            }
        },
        major: {
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
    })
    return UserInfo;
}