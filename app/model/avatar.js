'use strict';

module.exports = app => {
    const {
        INTEGER,
        STRING,
    } = app.Sequelize;
    const Avatar = app.model.define('Avatar', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        link: STRING(128),
    },
    {
        freezeTableName: true,
        tableName: 'avatar',
        timestamps: false
    });
    return Avatar;
};
