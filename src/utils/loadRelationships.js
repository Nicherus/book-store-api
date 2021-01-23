const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const CategoryProduct = require('../models/CategoryProduct');
const ProductOrder = require('../models/ProductOrder');

Product.belongsToMany( Category , { through: CategoryProduct }); 
Category.belongsToMany( Product , { through: CategoryProduct }); 
Order.belongsToMany(Product, { through: ProductOrder });