const router = require('express').Router();

const addressesSchemas = require('../schemas/addressesSchema');
const clientsSchemas = require('../schemas/clientsSchema');

router.post("/", async (req, res) => {

    //const validationAddress = addressesSchemas.postAddress.validate();

    const clientData = { name: req.body.name, cpf: req.body.cpf, email: req.body.email }
    const validationClient = clientsSchemas.postClient.validate(clientData);
    if( validationClient.error) return res.status(422).send({error: validationClient.error.details[0].message});

    try {
        const address;
        const client;

        res.status(201).send(client);
    } catch (err) {
        return res.sendStatus(500);
    }
});

module.exports = router;