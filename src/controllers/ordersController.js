const Order = require("../models/Order");
const ProductOrder = require("../models/ProductOrder");
const productsController = require ("../controllers/productsController");
const clientsController = require ("../controllers/clientsController");
const InexistingIdError = require("../errors/InexistingIdError");

async function postOrder(orderData) {
    const { clientId, productData, totalPrice } = orderData;
    await clientsController.getClientById(clientId);
    const order = await Order.create({clientId, totalPrice});

    const productOrdersPromisses = productData.map(async p => {
        await productsController.checkIfProductIdExists(p.productId);
        return {orderId: order.id, productId: p.productId, amount: p.amount};
    });

    const productOrders = await Promise.all(productOrdersPromisses);
    const productOrderList = await ProductOrder.bulkCreate(productOrders);

    const decrementPromisses = productData.map(async p => {
        await productsController.decrementProductStock(p.productId, p.amount);
    });
    const updatedProducts = await Promise.all(decrementPromisses);

    return order;
}

async function getAllOrders() {
    const orders = await Order.findAll({
        include: {
            model: ProductOrder,
            attributes: ['productId', 'amount'] 
        }
    });

    return orders;
}

async function getOrderById(id) {
    const order = await Order.findOne({
        where: { id },
        include: {
            model: ProductOrder,
            attributes: ['productId', 'amount'] 
        }
    });

    if(!order) throw new InexistingIdError();

    return order;
}

module.exports = { 
    postOrder,
    getAllOrders,
    getOrderById 
}