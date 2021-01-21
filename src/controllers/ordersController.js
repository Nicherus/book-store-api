const Order = require("../models/Order");
const ProductOrder = require("../models/ProductOrder");

async function postOrder(orderData) {
    const { clientId, productData, totalPrice } = orderData;
    const order = await Order.create({clientId, totalPrice});

    const productOrders = productData.map( p => {
        return {orderId: order.id, productId: p.productId, amount: p.amount};
    });

    const productOrder = await ProductOrder.bulkCreate(productOrders);

    return order;
}

module.exports = { 
    postOrder 
}