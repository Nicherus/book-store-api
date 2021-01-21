const Client = require("../models/Client");

async function postClient(clientData) {

    //const isThereThisCpf = await Client.findOne( { where: {cpf: clientData.cpf} } )

    const client = await Client.create(clientData);
    return client;
}

module.exports = { 
    postClient    
}