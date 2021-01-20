const router = require('express').Router();

const categoriesController = require("../controllers/categoriesController");
const ForbiddenError = require('../errors/ForbiddenError');
const categoryMiddleware = require('../middlewares/categoryMiddleware');

router.post("/", categoryMiddleware, async (req, res) => {
    try {
        const category = await categoriesController.postCategory(req.body.name);
        res.status(201).send(category);
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
    if(!id) return res.sendStatus(400);

    try {
        await categoriesController.deleteCategory(id);
        res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.put("/:id", categoryMiddleware, async (req, res) => {
    const { id } = req.params;
    if(!id) return res.sendStatus(400);
    
    try {
        const categoryUpdated = await categoriesController.updateCategory(id, req.body.name);
        res.send(categoryUpdated).status(200);
    } catch (err) {
        if(err instanceof ForbiddenError) return res.sendStatus(403);
        return res.sendStatus(500);
    }
});

module.exports = router;