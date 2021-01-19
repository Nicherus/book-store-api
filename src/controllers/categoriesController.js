const Category = require("../models/Category");

async function postCategory(name) {
    await Category.create({name});
}

async function getCategories() {
    await Category.create({name});
}

module.exports = { 
    postCategory,
    getCategories
}