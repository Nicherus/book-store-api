const router = require('express').Router();

const addressesSchemas = require('../schemas/addressesSchema');
const clientsSchemas = require('../schemas/clientsSchema');
const addressesController = require('../controllers/addressesController');

router.post("/", async (req, res) => {
    const addressData = {
        cep: req.body.cep,
        state: req.body.state,
        city: req.body.city,
        neighborhood: req.body.neighborhood,
        street: req.body.street,
        number: req.body.number,
        complement: req.body.complement
    };

    const validationAddress = addressesSchemas.postAddress.validate(addressData);
    // const validationClient = clientsSchemas.postClient.validate();
    if(validationAddress.error) return res.status(422).send({error: 'Data in wrong format'});

    try {
        const address = await addressesController.postAddress(addressData);
        // const client;

        res.status(201).send(address);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

module.exports = router;