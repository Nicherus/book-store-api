const ForbiddenError = require("../errors/ForbiddenError");
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

async function updateCategory(id, name) {
    const category = await Category.findByPk(id);
    category.name = name;
    
    await category.save();
    //tratar erro em caso de nome existente
    
    if(!category) throw new ForbiddenError();
    return category;
}

module.exports = { 
    postCategory,
    getCategories,
    deleteCategory,
    updateCategory    
}
