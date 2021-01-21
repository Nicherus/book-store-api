'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('photos', 'link', {
      type: Sequelize.STRING(65535),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('photos', 'link', {
      type: Sequelize.STRING(255),
      allowNull: false
    });
  }
};
