const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

class Category extends Sequelize.Model {}

Category.init(
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
      unique: true
    }},

    { sequelize, modelName: "category" }
);

module.exports = Category;