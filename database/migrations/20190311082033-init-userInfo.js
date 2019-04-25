'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
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
          model: user,
          key: 'id'
        }
      },
      school: STRING(32),
      major: STRING(32),
      avatar: STRING(128),
      phone: STRING(11),
      email: STRING(32),
      description: STRING(128),
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserInfo');
  }
};