'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('products', 'categoryId');
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'products',
      'categoryId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id'}
      }
    )
  }
};
