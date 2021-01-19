const joi = require('joi')

const postCategory = joi.object({
    name: joi.string().required()
})

module.exports = {
    postCategory
}