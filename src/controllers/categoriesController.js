const Category = require("../models/Category");

async function postCategory(name) {
    const category = await Category.create({name});
    return  category;
}

async function getCategories() {
}

module.exports = { 
    postCategory,
    getCategories    
}
