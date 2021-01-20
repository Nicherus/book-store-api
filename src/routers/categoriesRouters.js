const router = require('express').Router();

const categoriesController = require("../controllers/categoriesController");
const ForbiddenError = require('../errors/ForbiddenError');
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

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if(!id) return res.sendStatus(422);

    try {
        await categoriesController.deleteCategory(id);
        res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    if(!id) return res.sendStatus(422);

    const validation = categoriesSchemas.postCategory.validate(req.body);
    if(validation.error) return res.status(422).send({error: 'Data in wrong format'});
    
    const { name } = req.body;
    try {
        const categoryUpdated = await categoriesController.updateCategory(id, name);
        res.send(categoryUpdated).status(200);
    } catch (err) {
        if(err instanceof ForbiddenError) return res.sendStatus(403);
        return res.sendStatus(500);
    }
});

module.exports = router;