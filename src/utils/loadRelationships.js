const Product = require('../models/Product');
const Category = require('../models/Category');
const CategoryProduct = require('../models/CategoryProduct');

Product.belongsToMany( Category , { through: CategoryProduct }); 
Category.belongsToMany( Product , { through: CategoryProduct }); 