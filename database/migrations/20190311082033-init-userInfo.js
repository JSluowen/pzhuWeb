'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const {
            INTEGER,
            DATE,
            STRING
        } = Sequelize;
        await queryInterface.createTable('UserInfo', {
            id: {
                type: STRING(16),
                primaryKey: true,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            school: {
                type: INTEGER(10),
                references: {
                    model: 'school',
                    key: 'id'
                }
            },
            major: {
                type: INTEGER(10),
                references: {
                    model: 'major',
                    key: 'id'
                }
            },
            domin:{
                type: INTEGER(10),
                references: {
                    model: 'domin',
                    key: 'id'
                }
            },
            avatar: STRING(128),
            phone: STRING(11),
            email: STRING(32),
            description: STRING(128),
            created_at: DATE,
            updated_at: DATE,
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('userinfo');
    }
};
