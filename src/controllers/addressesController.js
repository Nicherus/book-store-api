const Address = require("../models/Address");

async function postAddress(addressData) {
    const address = await Address.create(addressData);
    return  address;
}


module.exports = { 
    postAddress    
}