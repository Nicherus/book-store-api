const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

class ProductOrder extends Sequelize.Model {}

ProductOrder.init(
    {
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
          },
          productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
    },

    { sequelize, modelName: "productOrder" }
);

module.exports = ProductOrder;