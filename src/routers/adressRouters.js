const router = require('express').Router();

const addressesController = require('../controllers/addressesController');

router.get("/", async (req, res) => {
    try {
        const adresses = await addressesController.getAddresses();
        res
        .header('Access-Control-Expose-Headers', 'X-Total-Count')
        .set('X-Total-Count', adresses.length)
        .send(adresses)
        .status(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const adresses = await addressesController.getAddressById(id);
        res
        .header('Access-Control-Expose-Headers', 'X-Total-Count')
        .set('X-Total-Count', adresses.length)
        .send(adresses)
        .status(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

module.exports = router;