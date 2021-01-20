const Product = require("../models/Product");
const Category = require("../models/Category");
const InexistingIdError = require('../errors/InexistingIdError');
const CategoryProduct = require("../models/CategoryProduct");
const Photo = require("../models/Photo");
const photosController = require('../controllers/photosController')

async function postProduct(productData) {

    const allCategories = await Category.findAll({ where: {id: productData.categories } });
    if (allCategories.length !== productData.categories.length ) {
        throw new InexistingIdError();
    }

    const { name, author, synopsis, amountStock, pages, year, price } = productData;
    const product =  await Product.create( {name, author, synopsis, amountStock, pages, year, price} );
  
    const arrayInsertMiddleTableCategory = productData.categories.map( c => { 
        return {"productId": product.id, "categoryId": c }
    });
    await CategoryProduct.bulkCreate( arrayInsertMiddleTableCategory );
    
    await photosController.postPhotos(productData.photos, product.id)

    const productAllData = await getProductById(product.id);
    return productAllData;
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

module.exports = {
    postProduct,
    getAllProductsByCategory,
    getProductById
}