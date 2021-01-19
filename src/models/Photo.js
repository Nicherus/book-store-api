const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

class Photo extends Sequelize.Model {}

Photo.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        link: {
            type: Sequelize.STRING,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    { sequelize, modelName: "photo" }
);

module.exports = Photo;