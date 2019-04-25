'use strict';

module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE
    } = app.Sequelize;
    const Domain = app.model.define('Domain', {
        id: {
            type: INTEGER(10),
            primaryKey: true
        },
        name: {
            type: STRING(16)
        },
        created_at: DATE,
        updated_at: DATE,
    },
        {
            underscored: true,
            tableName: 'domain',
        })

    Domain.associate = function () {
        app.model.Domain.hasMany(app.model.UserInfo, { foreignKey: 'domain', targetKey: 'id' })
    }

    return Domain
}