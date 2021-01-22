const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require('./utils/loadRelationships');

const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const productsRouter = require('./routers/productsRouters');
const categoriesRouters = require('./routers/categoriesRouters');
const clientsRouters = require('./routers/clientsRouters');
const ordersRouters = require('./routers/ordersRouters');
const addressesRouters = require('./routers/adressRouters');

app.use('/products', productsRouter)
app.use("/categories", categoriesRouters);
app.use("/clients", clientsRouters);
app.use("/orders", ordersRouters);
app.use("/addresses", addressesRouters);


module.exports = app;