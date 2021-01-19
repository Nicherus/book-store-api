const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

class Product extends Sequelize.Model {}

Product.init(
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    synopsis: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pages: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    amountStock: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }},
    
    { sequelize, modelName: "product" }
);

module.exports = Product;