'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, DATE, STRING, TEXT } = Sequelize;
        await queryInterface.createTable('article', {
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
            menuid: {
                type: INTEGER(10),
                references: {
                    model: 'Menu'
                }
            },
            technologyid: {
                type: INTEGER(10),
                references: {
                    model: 'Technology'
                }
            },
            title: {
                type: STRING(64)
            },
            abstract: {
                type: STRING(128)
            },
            keywords: {
                type: STRING(64)
            },
            postlink: {
                type: STRING(128)
            },
            context: {
                type: TEXT
            },
            raw: {
                type: TEXT
            },
            readnumber: {
                type: INTEGER(10)
            },
            status: {
                type: INTEGER(4)
            },
            top: {
                type: INTEGER(4)
            },
            created_at: DATE,
            updated_at: DATE,
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('article');
    }
};
