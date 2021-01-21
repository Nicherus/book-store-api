const router = require('express').Router();

const productsController = require('../controllers/productsController');
const InexistingIdError = require('../errors/InexistingIdError');
const productsSchemas = require('../schemas/productsSchema');

router.post('/', async (req,res) => {

    const validation = productsSchemas.postProductSchema.validate(req.body);
    if(validation.error) return res.status(422).send({error: validation.error.details[0].message});

    try {
        const product = await productsController.postProduct(req.body);
        res.status(201).send(product);
    } catch (err) {
        console.log(err);
        if (err instanceof InexistingIdError) {
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

    try {
        const product = await productsController.getProductById(req.params.id);
        res.status(200).send(product);
    } catch (err) {
        if(err instanceof InexistingIdError) {
            return res.status(400).send({error: "This Id does not belong to any product"});
        }
        console.log(err);
        res.sendStatus(500);
    }   
})

router.delete('/:id', async (req,res) => {

    try {
        await productsController.deleteProduct(req.params.id);
        res.status(200).send('Product deleted with success');
    } catch (err) {
        if(err instanceof InexistingIdError) {
            return res.status(400).send({error: "This Id does not belong to any product"});
        }
        console.log(err);
        res.sendStatus(500);
    }   
})

router.get('/', async (req,res) => {

    try {
        const products = await productsController.getAllProducts(req.params.id);
        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }   
})

router.get('/top-selling', async (req,res) => {

    try {
        const products = await productsController.getTopSellingProducts();
        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }   
})

router.put('/:id', async (req,res) => {
    
    const validation = productsSchemas.putProductSchema.validate(req.body);
    if(validation.error) return res.status(422).send({error: validation.error.details[0].message});

    try {
        const updatedProduct = await productsController.updateProduct(req.body, req.params.id);
        res.status(200).send(updatedProduct);
    } catch (err) {
        console.log(err);
        if (err instanceof InexistingIdError) {
            return res.status(400).send({error: 'Some category Id or Product does not exist'})
        }
        res.sendStatus(500);
    }   
})

module.exports = router