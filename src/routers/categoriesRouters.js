const router = require('express').Router();

const categoriesController = require("../controllers/categoriesController");
const InexistingIdError = require('../errors/InexistingIdError');
const categoryMiddleware = require('../middlewares/categoryMiddleware');

router.post("/", categoryMiddleware.categoryMiddleware, async (req, res) => {
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
        res
        .header('Access-Control-Expose-Headers', 'X-Total-Count')
        .set('X-Total-Count', categories.length)
        .send(categories)
        .status(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoriesController.getCategoriesById(id);
        res
        .header('Access-Control-Expose-Headers', 'X-Total-Count')
        .set('X-Total-Count', 1)
        .send(category)
        .status(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if(!id) return res.sendStatus(400);

    try {
        await categoriesController.deleteCategory(id);
        res.status(200).send({});
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.put("/:id", categoryMiddleware.categoryUpdateMiddleware, async (req, res) => {
    const { id } = req.params;
    if(!id) return res.sendStatus(400);
    
    try {
        const categoryUpdated = await categoriesController.updateCategory(id, req.body.name);
        res.send(categoryUpdated).status(200);
    } catch (err) {
        if(err instanceof InexistingIdError) return res.sendStatus(404);
        return res.sendStatus(500);
    }
});

module.exports = router;