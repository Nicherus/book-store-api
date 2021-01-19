'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productOrder', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'orders'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'products'
        }
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
    await queryInterface.dropTable('productOrder');
  }
};
