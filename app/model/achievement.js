'use strict';

module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE,
        BOOLEAN
    } = app.Sequelize;
    const Achievement = app.model.define('Achievement', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: STRING(16)
        },
        userid: {
            type: STRING(16),
            references: {
                model: 'UserInfo'
            }
        },
        typeid: {
            type: INTEGER(10),
            references: {
                model: 'AchievementType'
            }
        },
        abstract: {
            type: STRING(128),
        },
        posterlink: {
            type: STRING(128)
        },
        achivementlink: {
            type: STRING(128)
        },
        attachment: {
            type: STRING(128)
        },
        status: {
            type: BOOLEAN(4),
            defaultValue: 0
        },
        created_at: DATE,
        updated_at: DATE,
    },
    {
        underscored: true,
        tableName: 'achievement',
    }
    );

    Achievement.associate = function() {
        app.model.Achievement.belongsTo(app.model.AchievementType, { foreignKey: 'typeid', targetKey: 'id' });
        app.model.Achievement.belongsTo(app.model.UserInfo, { foreignKey: 'userid', targetKey: 'id' });
    };
    return Achievement;
};
