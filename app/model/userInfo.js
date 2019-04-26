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
        school: {
            type: INTEGER(10),
            references: {
                model: 'school',
                key: 'id'
            }
        },
        major: {
            type: INTEGER(10),
            references: {
                model: 'major',
                key: 'id'
            }
        },
        domain: {
            type: INTEGER(10),
            references: {
                model: 'Domain',
                key: 'id'
            }
        },
        avatar: STRING(128),
        phone: STRING(11),
        description: STRING(128),
        created_at: DATE,
        updated_at: DATE,
    }, {
            underscored: true,
            tableName: 'userinfo',
        })

    UserInfo.associate = function () {
        app.model.UserInfo.hasMany(app.model.Article, { foreignKey: 'userid', targetKey: 'id' })
        app.model.UserInfo.belongsTo(app.model.School, { foreignKey: 'school', targetKey: 'id' })
        app.model.UserInfo.belongsTo(app.model.Major, { foreignKey: 'major', targetKey: 'id' })
        app.model.UserInfo.belongsTo(app.model.Domain, { foreignKey: 'domain', targetKey: 'id' })
    }

    return UserInfo;
}