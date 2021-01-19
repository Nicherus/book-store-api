const router = require('express').Router();

const categoriesController = require("../controllers/categoriesController");
const categoriesSchemas = require('../schemas/categoriesSchema');

router.post("/", async (req, res) => {
    const validation = categoriesSchemas.postCategory.validate(req.body);
    if(validation.error) return res.status(422).send({error: 'Data in wrong format'});

    try {
        const category = await categoriesController.postCategory(req.body.name);
        res.status(200).send(category);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get("/", async (req, res) => {
    try {
        const categories = await categoriesController.getCategories();
        res.send(categories).status(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

module.exports = router;