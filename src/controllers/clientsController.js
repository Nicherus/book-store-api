const Client = require("../models/Client");

async function postClient(clientData) {
    const client = await Client.create(clientData);
    return  client;
}

module.exports = { 
    postClient    
}