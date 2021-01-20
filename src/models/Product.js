const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const Category = require("./Category");
const CategoryProduct = require("./CategoryProduct");
const Photo = require("./Photo");
const ProductOrder = require("./ProductOrder");

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
    amountStock: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }},
    
    { sequelize, modelName: "product" }
);

Product.hasMany( Photo ); 
Product.hasMany( ProductOrder ); 

module.exports = Product;