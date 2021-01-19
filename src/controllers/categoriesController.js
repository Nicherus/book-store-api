const Category = require("../models/Category");

async function postCategory(name) {
    const category = await Category.create({name});
    return  category;
}

async function getCategories() {
    const categories = await Category.findAll();
    return categories;
}

module.exports = { 
    postCategory,
    getCategories    
}
