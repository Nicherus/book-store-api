const Category = require("../models/Category");

async function postCategory(name) {
    const category = await Category.create({name});
    return  category;
}

module.exports = {
    postCategory
}