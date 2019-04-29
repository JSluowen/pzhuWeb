'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE } = app.Sequelize;
    const Major = app.model.define(
        'Major',
        {
            id: {
                type: INTEGER(10),
                primaryKey: true,
            },
            name: {
                type: STRING(16),
            },
            school: {
                type: INTEGER(10),
                references: {
                    model: 'School',
                },
            },
            created_at: DATE,
            updated_at: DATE,
        },
        {
            underscored: true,
            tableName: 'major',
        },
    );

    Major.associate = function() {
        app.model.Major.hasMany(app.model.UserInfo, { foreignKey: 'major', targetKey: 'id' });
        app.model.Major.belongsTo(app.model.School, { foreignKey: 'school', targetKey: 'id' });
    };

    return Major;
};
