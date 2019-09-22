'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, STRING } = Sequelize;
        await queryInterface.createTable('media', {
            id: {
                type: INTEGER(10),
                primaryKey: true,
                autoIncrement: true
            },
            userid: {
                type: STRING(16),
                references: {
                    model: 'UserInfo'
                }
            },
            articleid: {
                type: INTEGER(10),
                references: {
                    model: 'Article'
                }
            },
            link: {
                type: STRING(255),
            },
            key: {
                type: STRING(128)
            },
            status: {
                type: INTEGER(4),
                defaultValue: 1
            }
        });
    },

    down: async queryInterface => {
        await queryInterface.dropTable('media');
    }
};
