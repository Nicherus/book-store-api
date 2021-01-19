const joi = require('joi')

const postProductSchema = joi.object({
    name: joi.string().required(),
    author: joi.string().required(),
    synopsis: joi.string().required(),
    amountStock: joi.number().integer().required(),
    pages: joi.number().integer().required(),
    year: joi.number().integer().required(),
    price: joi.number().integer().required(),
    categoryId: joi.number().integer().required(),
})

module.exports = {
    postProductSchema,
}