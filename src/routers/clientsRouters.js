const router = require('express').Router();

const addressesSchemas = require('../schemas/addressesSchema');
const clientsSchemas = require('../schemas/clientsSchema');
const addressesController = require('../controllers/addressesController');
const clientsController= require('../controllers/clientsController');
const ForbiddenError = require('../errors/ForbiddenError');

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


    const clientData = { name: req.body.name, cpf: req.body.cpf, email: req.body.email, creditCard: req.body.creditCard }
    const validationClient = clientsSchemas.postClient.validate(clientData);
    if( validationClient.error) return res.status(422).send({error: validationClient.error.details[0].message});
    

    try {
        const address = await addressesController.postAddress(addressData);
        const client =  await clientsController.postClient({...clientData, addressId: address.id});
        res.status(201).send(client);
    } catch (err) {
        if(err instanceof ForbiddenError) return res.sendStatus(403);
        return res.sendStatus(500);
    }
});

router.get("/", async (req, res) => {
    try {
        const clients = await clientsController.getAllClients();
        res.status(200).send(clients);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if(!id) return res.sendStatus(400);

    try {
        const client = await clientsController.getClientById(id);
        return res.status(200).send(client);
    } catch (err) {
        if(err instanceof InexistingIdError) return res.status(400).send({error: "This Id does not belong to any client"});
        return res.sendStatus(500);
    }
})

module.exports = router;