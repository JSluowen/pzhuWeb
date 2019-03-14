'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING
    } = app.Sequelize;
    const User = app.model.define('user', {
        id: {
            type: STRING(16),
            primaryKey: true
        },
        password: STRING(32),
        name: STRING(16),
        email: STRING(32),
        status: {
            type: INTEGER(4),
            defaultValue: 0
        },
        created_at: DATE,
        updated_at: DATE,
    })

    return User;
}