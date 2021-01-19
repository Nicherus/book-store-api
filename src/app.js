const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const productsRouter = require('./routers/productsRouters');

app.use('/products', productsRouter)


module.exports = app;