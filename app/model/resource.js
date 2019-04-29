'use strict';

module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE,
        BOOLEAN
    } = app.Sequelize;
    const Resource = app.model.define('Resource', {
        id: {
            type: INTEGER(10),
            primaryKey: true
        },
        userid: {
            type: STRING(16),
            references: {
                model: 'User'
            }
        },
        type: {
            type: INTEGER(10),
            references: {
                model: 'ResourceType'
            }
        },
        title: {
            type: STRING(64)
        },
        description: {
            type: STRING(128)
        },
        posterlink: {
            type: STRING(128)
        },
        link: {
            type: STRING(128)
        },
        attachment: {
            type: STRING(128)
        },
        status: {
            type: BOOLEAN(4)
        },
        created_at: DATE,
        updated_at: DATE,
    },
        {
            underscored: true,
            tableName: 'resource',
        }
    )

    // Resource.associate = function () {
    //     app.model.Resource.belongsTo(app.model.ResourceType, { foreignKey: 'type', targetKey: 'id' })
    // }

    return Resource
}