'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BOOLEAN } = Sequelize;
    await queryInterface.createTable('resource', {
      id: {
        type: INTEGER(10),
        primaryKey: true
      },
      userid: {
        type: STRING(16),
        references: {
          model: 'UserInfo'
        }
      },
      resourcetypeid: {
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
        type: BOOLEAN(4),
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    await queryInterface.dropTable('resource');
  }
};
