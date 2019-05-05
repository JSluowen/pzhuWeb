'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, DATE, STRING } = Sequelize;
        await queryInterface.createTable('resourcetype', {
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
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('resourcetype');

    }
};
