const joi = require('joi')

const postProductSchema = joi.object({
    name: joi.string().required(),
    author: joi.string().required(),
    synopsis: joi.string().required(),
    amountStock: joi.number().integer(),
    pages: joi.number().integer().required(),
    year: joi.number().integer().required(),
    price: joi.number().integer().required(),
    photos: joi.array().items(joi.string()).min(1).required(),
    categories: joi.array().items(joi.number().integer()).min(1).required(),
})

const putProductSchema = joi.object({
    name: joi.string(),
    author: joi.string(),
    synopsis: joi.string(),
    amountStock: joi.number().integer(),
    pages: joi.number().integer(),
    year: joi.number().integer(),
    price: joi.number().integer(),
    photos: joi.array().items(joi.string()).min(1),
    categories: joi.array().items(joi.number().integer()).min(1),
})

module.exports = {
    postProductSchema,
    putProductSchema
}