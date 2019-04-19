'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('Technology', {
      id: {
        type: INTEGER(10),
        primaryKey: true
      },
      userid: {
        type:STRING(16)
      },
      articleid:{
        type:INTEGER(10),
        references:{
          model:'Article'
        }
      },
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Technology');
  }
};
