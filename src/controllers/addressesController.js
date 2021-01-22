const Address = require("../models/Address");

async function postAddress(addressData) {
    const address = await Address.create(addressData);
    return  address;
}

async function getAddresses() {
    const address = await Address.findAll();
    return  address;
}

async function getAddressById(id) {
    const address = await Address.findOne({ where: {id} });
    return  address;
}


module.exports = { 
    postAddress,
    getAddresses,
    getAddressById,
}