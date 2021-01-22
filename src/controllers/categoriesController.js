const InexistingIdError = require("../errors/InexistingIdError");
const ForbiddenError = require("../errors/ForbiddenError");
const Category = require("../models/Category");
const CategoryProduct = require("../models/CategoryProduct");
const Product = require("../models/Product");

async function postCategory(name) {
    const category = await Category.create({name});
    return category;
}

async function getCategories() {
    const categories = await Category.findAll({
        include: [
        {
            model: Product,
            attributes: ['id'],
            through: {
                attributes: []
            },
        },
        ],
    });
    return categories;
}

async function getCategoriesById(id) {
    const category = await Category.findOne({ where: {id} });
    return category;
}

async function deleteCategory(id) {
    await CategoryProduct.destroy({ where: {categoryId: id}});
    const categoryToDestroy = await Category.findByPk(id);
    await categoryToDestroy.destroy();
}

async function updateCategory(id, name) {
    const category = await Category.findByPk(id);
    category.name = name;  
    await category.save();
    return category;
}

async function validateExistsCategoryName(name) {
    const existsOtherCategoryWithThisName = await Category.findOne({ where: {name} });
    if(existsOtherCategoryWithThisName) throw new ForbiddenError();
}

module.exports = { 
    postCategory,
    getCategories,
    deleteCategory,
    updateCategory,
    getCategoriesById,
    validateExistsCategoryName, 
}
