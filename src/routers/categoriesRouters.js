const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categoriesController");

router.post("/", async (req, res) => {
  try {
    const category = await categoriesController.postCategory(req.body.name);
    res.status(200).send(category);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;