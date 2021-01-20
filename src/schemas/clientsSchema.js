const { validator } = require('cpf-cnpj-validator')
const joi = require('@hapi/joi').extend(validator)

const postClient = joi.object({
    email: joi.string().email().required(),
    name: joi.string().required(),
    cpf: joi.document().cpf().required(),
    creditCard: joi.string().required(),
});

module.exports = {
    postClient,
}