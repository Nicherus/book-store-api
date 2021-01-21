const joi = require('joi')

const postOrder = joi.object({
    clientId: joi.number().integer().required(),
    productData: joi.array().items(joi.object({ 
        productId: joi.number().integer(), 
        amount: joi.number().integer() 
    })).required(),
    totalPrice: joi.number().integer().required(),

})

module.exports = {
    postOrder
}