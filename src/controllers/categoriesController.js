const ForbiddenError = require("../errors/ForbiddenError");
const Category = require("../models/Category");

async function postCategory(name) {

    const existsOtherCategoryWithThisName = await Category.findOne({ where: {name} });
    if(existsOtherCategoryWithThisName) throw new ForbiddenError();

    const category = await Category.create({name});
    return category;
}

async function getCategories() {
    const categories = await Category.findAll();
    return categories;
}

async function deleteCategory(id) {

        //deletar tabela meio com esse Id
    const categoryToDestroy = await Category.findByPk(id);
    await categoryToDestroy.destroy();

}

async function updateCategory(id, name) {
    const existsOtherCategoryWithThisName = await Category.findOne({ where: {name} });
    if(existsOtherCategoryWithThisName) throw new ForbiddenError();

    const category = await Category.findByPk(id);
    category.name = name;  
    await category.save();

    return category;
}

module.exports = { 
    postCategory,
    getCategories,
    deleteCategory,
    updateCategory    
}
