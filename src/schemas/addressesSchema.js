const joi = require('joi')

const postAddress = joi.object({
    cep: joi.string().required(),
    state: joi.string().required(),
    city: joi.string().required(),
    neighborhood: joi.string().required(),
    street: joi.string().required(),
    number: joi.number().integer().required(),
    complement: joi.string()
});

module.exports = {
    postAddress
}