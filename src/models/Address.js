const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

class Address extends Sequelize.Model {}

Address.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        cep: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        neighborhood: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        complement: {
            type: Sequelize.STRING,
        }
    },
    { sequelize, modelName: "address" }
);

module.exports = Address;