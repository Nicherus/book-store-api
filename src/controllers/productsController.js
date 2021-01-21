const Product = require("../models/Product");
const Category = require("../models/Category");
const InexistingIdError = require('../errors/InexistingIdError');
const CategoryProduct = require("../models/CategoryProduct");
const ProductOrder = require("../models/ProductOrder");
const Photo = require("../models/Photo");
const photosController = require('../controllers/photosController');

async function postProduct(productData) {

    await _checkIfExistsAllCategories(productData.categories);

    const { name, author, synopsis, amountStock, pages, year, price } = productData;
    const product =  await Product.create( {name, author, synopsis, amountStock, pages, year, price} );
  
    await _addCategoriesProductsInMiddleTable(productData.categories, product.id);
    
    await photosController.postPhotos(productData.photos, product.id)

    const productAllData = await getProductById(product.id);
    return productAllData;
}

async function getAllProducts() {
    const products = await Product.findAll();
    return products;
}

async function getTopSellingProducts() {
    const products = await Product.findAll({
        limit: 4,
        include: [
            {
                model: Photo,
                attributes: ['id', 'link']
            },
            {
                model: Category,
                attributes: ['id', 'name'],
                through: {
                    attributes: [],
                }
            },
            {
                model: ProductOrder,
                attributes: ['amount']
            }
        ],
        order: [  
            [ { model: CategoryProduct}, 'id', 'DESC'],
        ]
    });
    return products;
}

async function getAllProductsByCategory(categoryId) {

    const existThisCategoryId = await Category.findOne( {where: { id: categoryId} } );
    if(!existThisCategoryId) throw new InexistingIdError();

    const categoryWithItsProducts =  await Category.findOne( 
        {
            where: {id: categoryId},
            include: {
                        model: Product,
                        attributes: ['name', 'author', 'synopsis', 'amountStock', 'pages', 'year', 'price'],
                        through: {
                            attributes: []
                        },
                        include: [
                            {
                                model: Photo,
                                attributes: ['id', 'link']
                            },
                            {
                                model: Category,
                                attributes: ['id', 'name'],
                                through: {
                                    attributes: [],
                                }
                            }
                        ]
            },
        });
    return categoryWithItsProducts;
}

async function getProductById(id) {

    const product =  await Product.findOne({
        where: { id },
        include: [
            {
                model: Photo,
                attributes: ['id', 'link']
            },
            {
                model: Category,
                attributes: ['id', 'name'],
                through: {
                    attributes: [],
                }
            }
        ]
    });
    if (!product) {
        throw new InexistingIdError();
    }
    return product;
}

async function deleteProduct(id) {

    await _checkIfProductIdExists(id);

    await Photo.destroy( { where: { productId:id} } );
    await CategoryProduct.destroy( { where: { productId:id} } );
    await ProductOrder.destroy( { where: { productId:id} } );
    await Product.destroy( {where: {id} });
}

async function updateProduct(productData, id) {

    const product =  await _checkIfProductIdExists(id);

    if (productData.categories) {
        await _checkIfExistsAllCategories(productData.categories);
        await CategoryProduct.destroy( { where: { "productId": id} } );
        await _addCategoriesProductsInMiddleTable(productData.categories, id);
    }

    if (productData.photos) {
        await Photo.destroy( { where: { "productId": id} } );
        await photosController.postPhotos(productData.photos, id);
    }

    const { name, author, synopsis, amountStock, pages, year, price } = productData;
    
    product.name = name || product.name;
    product.author = author || product.author;
    product.synopsis = synopsis || product.synopsis;
    product.amountStock = amountStock || product.amountStock;
    product.pages = pages || product.pages;
    product.year = year || product.year;
    product.price = price || product.price;
    await product.save();

    const updatedProductAllData = await getProductById(product.id);
    return updatedProductAllData;
}

async function _checkIfExistsAllCategories(categories) {

    const allCategories = await Category.findAll({ where: {id: categories } });
        if (allCategories.length !== categories.length ) {
            throw new InexistingIdError();
        }
}

async function _checkIfProductIdExists(id) {

    const product = await Product.findOne( { where: {id} } );
    if(!product) throw new InexistingIdError();
    return product;
}

async function _addCategoriesProductsInMiddleTable(categoriesIds, productId) {
    const arrayInsertMiddleTableCategory = categoriesIds.map( c => { 
        return {"productId": productId, "categoryId": c }
    });
    await CategoryProduct.bulkCreate( arrayInsertMiddleTableCategory );
}

async function decrementProductStock(productId, decrement) {
    const product =  await _checkIfProductIdExists(productId);

    product.amountStock = product.amountStock - decrement;
    const updatedProduct = await product.save();
    return product;
}


module.exports = {
    postProduct,
    getAllProducts,
    getAllProductsByCategory,
    getProductById,
    deleteProduct,
    updateProduct,
    getTopSellingProducts,
    decrementProductStock
}