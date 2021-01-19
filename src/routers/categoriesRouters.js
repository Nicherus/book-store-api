const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categoriesController");

router.post("/", async (req, res) => {
  try {
    await categoriesController.postCategory(req.body.name);
    res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;