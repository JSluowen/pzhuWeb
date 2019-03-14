'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) => {
     const { INTEGER, DATE, STRING } = Sequelize;
     await queryInterface.createTable('user',{
       id:{type:STRING(16),primaryKey:true},
       password:STRING(32),
       name:STRING(16),
       email: STRING(32),
       status:{type: INTEGER(4),defaultValue:0},
       created_at: DATE,
       updated_at: DATE,
     })
  },

  down:async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
