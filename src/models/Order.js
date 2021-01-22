const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const ProductOrder = require("./ProductOrder");

class Order extends Sequelize.Model {}

Order.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        clientId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        totalPrice: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    },
    { sequelize, modelName: "order" }
);

Order.hasMany(ProductOrder);

module.exports = Order;