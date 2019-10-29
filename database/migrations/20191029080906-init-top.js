'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('top', {
      id: {
        type: INTEGER(5),
        primaryKey: true,
        autoIncrement: true
      },
      userid: {
        type: STRING(16),
        references: {
          model: 'UserInfo'
        }
      },
      best_scre: {
        type: STRING(10)
      }

    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('top');
  }
};
