const router = require('express').Router();
const productsController = require('../controllers/productsController');
const productsSchemas = require('../schemas/productsSchema');

router.post('/', async (req,res) => {

    const validation = productsSchemas.postProductSchema.validate(req.body);
    if(validation.error) return res.status(422).send({error: 'Data in wrong format'});

    try {
        const product = await productsController.postProduct(req.body);
        res.status(201).send(product);
    } catch (err) {
        res.sendStatus(500);
    }   
})

router.get('/:categoryId', async (req,res) => {

    try {
        const products = await productsController.getAllProductsByCategory(req.params.id);
        res.status(200).send(products);
    } catch (err) {
        res.sendStatus(500);
    }   
})

module.exports = router