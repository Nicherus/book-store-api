'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categoryProduct', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id'}
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id'}
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
	  })
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('categoryProduct');
  }
};
