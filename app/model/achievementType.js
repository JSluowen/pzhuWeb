'use strict';

module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE
    } = app.Sequelize;
    const AchievementType = app.model.define('AchievementType', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: STRING(16)
        },
        created_at: DATE,
        updated_at: DATE,
    },
    {
        underscored: true,
        tableName: 'achievement_type',
    });

    AchievementType.associate = function() {
        app.model.AchievementType.hasMany(app.model.Achievement, { foreignKey: 'typeid', targetKey: 'id' });
    };
    return AchievementType;
};
