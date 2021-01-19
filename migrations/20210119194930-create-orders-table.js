'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'clients'
        }
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('orders');
  }
};
