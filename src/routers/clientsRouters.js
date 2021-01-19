const router = require('express').Router();

const addressesSchemas = require('../schemas/addressesSchema');
const clientsSchemas = require('../schemas/clientsSchemas');

router.post("/", async (req, res) => {
    const validationAddress = addressesSchemas.postAddress.validate();
    const validationClient = clientsSchemas.postClient.validate();
    if(validationAddress.error || validationClient.error) return res.status(422).send({error: 'Data in wrong format'});

    try {
        const address;
        const client;

        res.status(201).send(client);
    } catch (err) {
        return res.sendStatus(500);
    }
});

module.exports = router;