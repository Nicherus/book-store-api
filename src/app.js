const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const express = require("express");

const categoriesRouters = require('./routers/categoriesRouters');


const app = express();
app.use(cors());
app.use(express.json());

app.use("/categories", categoriesRouters);


module.exports = app;