'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('clients', 'cpf', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('clients', 'cpf', {
      type: Sequelize.STRING,
        allowNull: false,
        unique: true
    });
  }
};
