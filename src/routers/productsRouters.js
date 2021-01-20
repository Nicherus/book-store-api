const router = require('express').Router();

const productsController = require('../controllers/productsController');
const ForbiddenError = require('../errors/ForbiddenError');
const productsSchemas = require('../schemas/productsSchema');

router.post('/', async (req,res) => {

    const validation = productsSchemas.postProductSchema.validate(req.body);
    if(validation.error) return res.status(422).send({error: validation.error.details[0].message});

    try {
        const product = await productsController.postProduct(req.body);
        res.status(201).send(product);
    } catch (err) {
        console.log(err);
        if (err instanceof ForbiddenError) {
            return res.status(400).send({error: 'Some category Id does not exist'})
        }
        res.sendStatus(500);
    }   
})

router.get('/category/:categoryId', async (req,res) => {

    try {
        const products = await productsController.getAllProductsByCategory(req.params.categoryId);
        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }   
})

router.get('/:id', async (req,res) => {

    //se Id existe senao 400

    try {
        const product = await productsController.getProductById(req.params.id);
        res.status(200).send(product);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }   
})

module.exports = router