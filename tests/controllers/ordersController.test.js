const ordersController = require("../../src/controllers/ordersController");
const InexistingIdError = require("../../src/errors/InexistingIdError");

jest.mock('../../src/models/Order');
jest.mock('sequelize');
const Order = require("../../src/models/Order");

describe('getAllOrders', () => {
    it('returns orders array', async () => {
        const orders = [{
            "id": 4,
            "clientId": 1,
            "totalPrice": 5000,
            "updatedAt": "2021-01-21T22:33:27.912Z",
            "createdAt": "2021-01-21T22:33:27.912Z"
        }];
        const expected = orders;
		Order.findAll.mockResolvedValue(orders);

		const result = await ordersController.getAllOrders(orders);
		expect(result).toBe(expected);
    });
});

describe('getOrderById', () => {
    it('returns a order', async () => {
        const order = {
            "id": 4,
            "clientId": 1,
            "totalPrice": 5000,
            "updatedAt": "2021-01-21T22:33:27.912Z",
            "createdAt": "2021-01-21T22:33:27.912Z"
        };
        const expected = order;
		Order.findOne.mockResolvedValue(order);

		const result = await ordersController.getOrderById(order);
		expect(result).toBe(expected);
    });

    it('return error instance of InexistingIdError', async () => {
        const expected = InexistingIdError;
		Order.findOne.mockResolvedValue(null);

		const fn = async () => {
            await ordersController.getOrderById()
        }
        expect(fn).rejects.toThrow(expected);
    });
});