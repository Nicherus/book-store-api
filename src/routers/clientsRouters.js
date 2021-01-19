const router = require('express').Router();

const addressesSchemas = require('../schemas/addressesSchema');
const clientsSchemas = require('../schemas/clientsSchema');
const addressesController = require('../controllers/addressesController');
const clientsController= require('../controllers/clientsController');

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
    if(validationAddress.error) return res.status(422).send({error: validationAddress.error.details[0].message});

    //implementar logica de cartao de credito

    const clientData = { name: req.body.name, cpf: req.body.cpf, email: req.body.email }
    const validationClient = clientsSchemas.postClient.validate(clientData);
    if( validationClient.error) return res.status(422).send({error: validationClient.error.details[0].message});
    

    try {
        const address = await addressesController.postAddress(addressData);
        const client =  await clientsController.postClient({...clientData, addressId: address.id});
        res.status(201).send(client);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

module.exports = router;