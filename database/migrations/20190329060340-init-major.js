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
          model:'School'
        }
      },
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    await queryInterface.dropTable('major');
  }
};
