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
        school: INTEGER(10),
        major: INTEGER(10),
        avatar: STRING(128),
        phone: STRING(11),
        description: STRING(128),
        created_at: DATE,
        updated_at: DATE,
    })
    return UserInfo;
}