const Product = require("../models/Product");

async function postProduct(productData) {

    const {name, author, synopsis, amountStock, pages, year, price, categoryId} = productData;

    const product =  await Product.create( {name, author, synopsis, amountStock, pages, year, price, categoryId} );
    return product;
}

async function getAllProductsByCategory(categoryId) {

    const products =  await Product.findAll( {where: {categoryId}} );
    return products;
}

async function getProductById(id) {

    const product =  await Product.findAll( { where: { id } } );
    return product;
}

module.exports = {
    postProduct,
    getAllProductsByCategory,
    getProductById
}