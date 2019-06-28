'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, DATE, STRING, BOOLEAN } = Sequelize;
        await queryInterface.createTable('achievement', {
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
                    model: 'achievementtype'
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
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('achievement');
    }
};
