'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('major',{
      id:{
        type:INTEGER(10),
        primaryKey:true
      },
      name:{
        type:STRING(16)
      },
      school:{
        type:INTEGER(10),
        references:{
          model:'school'
        }
      },
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
