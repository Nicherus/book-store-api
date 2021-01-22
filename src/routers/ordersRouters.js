const router = require('express').Router();

const ordersController = require("../controllers/ordersController");
const ordersSchemas = require("../schemas/ordersSchema");

router.post("/", async (req, res) => {
    const validationData = ordersSchemas.postOrder.validate(req.body);
    if(validationData.error) return res.status(422).send({error: validationData.error.details[0].message});
    
    try {
        const order = await ordersController.postOrder(req.body);
        return res.status(200).send(order);
    } catch (err) {
        if(err instanceof InexistingIdError) {
            return res.status(400).send({error: "Some Id does not belong to any product"});
        }
        return res.sendStatus(500);
    }
});

module.exports = router;