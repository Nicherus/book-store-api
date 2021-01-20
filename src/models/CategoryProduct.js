const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

class CategoryProduct extends Sequelize.Model {}

CategoryProduct.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
            productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
            categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    { sequelize, modelName: "categoryProduct", tableName: 'categoryProduct' }
);

module.exports = CategoryProduct;