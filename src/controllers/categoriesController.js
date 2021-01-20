const Category = require("../models/Category");

async function postCategory(name) {
    const category = await Category.create({name});
    return  category;
}

async function getCategories() {
    const categories = await Category.findAll();
    return categories;
}

async function deleteCategory(id) {
    const categoryToDestroy = await Category.findByPk(id);
    await categoryToDestroy.destroy();
}

module.exports = { 
    postCategory,
    getCategories,
    deleteCategory    
}
