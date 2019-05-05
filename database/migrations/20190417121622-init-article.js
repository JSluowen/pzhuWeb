'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING,TEXT,TIME } = Sequelize;
    await queryInterface.createTable('Article', {
      id: {
        type: INTEGER(10),
        primaryKey: true
      },
      userid:{
        type:STRING(16),
        references:{
          model:'User'
        }
      },
      menuid:{
        type:INTEGER(10),
        references:{
          model:'Menu'
        }
      },
      technologyid:{
        type:INTEGER(10),
        references:{
          model:'Technology'
        }
      },
      title:{
        type:STRING(64)
      },
      abstract:{
        type:STRING(128)
      },
      keywords:{
        type:STRING(64)
      },
      postlink:{
        type:STRING(128)
      },
      context:{
        type:TEXT
      },
      time:{
        type:TIME
      },
      readnumber:{
        type:INTEGER(10)
      },
      status:{
        type:INTEGER(4)
      },
      top:{
        type:INTEGER(4)
      },
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Article');
  }
};
