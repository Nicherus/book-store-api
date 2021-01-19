'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clients', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      creditCard: {
        type: Sequelize.STRING,
      },
      addressId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'addresses'
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
    await queryInterface.dropTable('clients');
  }
};
