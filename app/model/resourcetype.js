'use strict';

module.exports = app => {
    const {
        INTEGER,
        STRING,
    } = app.Sequelize;
    const ResourceType = app.model.define('ResourceType', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: STRING(16)
        }
    },
    {
        timestamps: false,
        underscored: true,
        tableName: 'resource_type',
    });

    ResourceType.associate = function() {
        app.model.ResourceType.hasMany(app.model.Resource, { foreignKey: 'typeid', targetKey: 'id' });
    };
    return ResourceType;
};
