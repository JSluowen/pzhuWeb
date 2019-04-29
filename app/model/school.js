'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE } = app.Sequelize;
    const School = app.model.define(
        'School',
        {
            id: {
                type: INTEGER(10),
                primaryKey: true,
            },
            name: {
                type: STRING(16),
            },
            created_at: DATE,
            updated_at: DATE,
        },
        {
            underscored: true,
            tableName: 'school',
        },
    );

    School.associate = function() {
        app.model.School.hasMany(app.model.Major, { foreignKey: 'school', targetKey: 'id' });
        app.model.School.hasMany(app.model.UserInfo, { foreignKey: 'school', targetKey: 'id' });
    };

    return School;
};
