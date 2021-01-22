const router = require('express').Router();

const photosController = require('../controllers/photosController');
const InexistingIdError = require('../errors/InexistingIdError')

router.get("/", async (req, res) => {
    try {
        const photos = await photosController.getAllPhotos();
        res.status(200).send(photos);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if(!id) return res.sendStatus(400);
    try {
        const photos = await photosController.getPhotoById(id);
        res.status(200).send(photos);
    } catch (err) {
        console.log(err);
        if (err instanceof InexistingIdError) {
            res.status(404).send({error: 'Id does not exist'})
        }
        return res.sendStatus(500);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if(!id) return res.sendStatus(400);

    try {
        await photosController.deletePhoto(id);
        res.status(200);
    } catch (err) {
        console.log(err);
        if (err instanceof InexistingIdError) {
            res.status(404).send({error: 'Id does not exist'})
        }
        return res.sendStatus(500);
    }
});


module.exports = router;