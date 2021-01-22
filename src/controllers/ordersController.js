const Order = require("../models/Order");
const ProductOrder = require("../models/ProductOrder");
const productsController = require ("../controllers/productsController");
const clientsController = require ("../controllers/clientsController");

async function postOrder(orderData) {
    const { clientId, productData, totalPrice } = orderData;
    await clientsController.getClientById(clientId);
    const order = await Order.create({clientId, totalPrice});

    const productOrdersPromisses = productData.map(async p => {
        await productsController._checkIfProductIdExists(p.productId);
        return {orderId: order.id, productId: p.productId, amount: p.amount};
    });

    const productOrders = await Promise.all(productOrdersPromisses);
    const productOrderList = await ProductOrder.bulkCreate(productOrders);

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

module.exports = { 
    postOrder,
    getAllOrders 
}