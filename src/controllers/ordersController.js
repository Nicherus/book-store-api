const Order = require("../models/Order");
const ProductOrder = require("../models/ProductOrder");
const productsControllers = require ("../controllers/productsController");
const clientsControllers = require ("../controllers/clientsController");

async function postOrder(orderData) {
    const { clientId, productData, totalPrice } = orderData;
    await clientsControllers.getClientById(clientId);
    const order = await Order.create({clientId, totalPrice});

    const productOrdersPromisses = productData.map(async p => {
        await productsControllers._checkIfProductIdExists(p.productId);
        return {orderId: order.id, productId: p.productId, amount: p.amount};
    });

    const productOrders = await Promise.all(productOrdersPromisses);
    const productOrderList = await ProductOrder.bulkCreate(productOrders);

    return order;
}

module.exports = { 
    postOrder 
}