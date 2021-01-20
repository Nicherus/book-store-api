const Product = require("../models/Product");
const Category = require("../models/Category");
const ForbiddenError = require('../errors/ForbiddenError');
const CategoryProduct = require("../models/CategoryProduct");
const Photo = require("../models/Photo");
const photosController = require('../controllers/photosController')

async function postProduct(productData) {

    const allCategories = await Category.findAll({ where: {id: productData.categories } });
    if (allCategories.length !== productData.categories.length ) {
        throw new ForbiddenError();
    }

    const { name, author, synopsis, amountStock, pages, year, price } = productData;
    const product =  await Product.create( {name, author, synopsis, amountStock, pages, year, price} );
  
    const arrayInsertMiddleTableCategory = productData.categories.map( c => { 
        return {"productId": product.id, "categoryId": c }
    });
    await CategoryProduct.bulkCreate( arrayInsertMiddleTableCategory );
    
    await photosController.postPhotos(productData.photos, product.id)

    //buscar Product

    return product;
}

async function getAllProductsByCategory(categoryId) {

    const products =  await Product.findAll( 
        {
            where: {categoryId},
            include: {
                model: 'Photo',
            }
        });
    return products;

    //include Photos
}

async function getProductById(id) {

    const product =  await Product.findOne( { where: { id } } );
    //se não existe => avisar
    //include Photos e categories
    return product;
}

module.exports = {
    postProduct,
    getAllProductsByCategory,
    getProductById
}