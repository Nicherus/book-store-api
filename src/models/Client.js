const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

class Client extends Sequelize.Model {}

Client.init(
    {
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
          },
    },

    { sequelize, modelName: "client" }
);

module.exports = Client;