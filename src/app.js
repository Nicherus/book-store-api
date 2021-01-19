const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
    res.send("deu bom");
});


module.exports = app;