const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const productsRouter = require('./routers/productsRouters');
const categoriesRouters = require('./routers/categoriesRouters');

app.use('/products', productsRouter)
app.use("/categories", categoriesRouters);


module.exports = app;