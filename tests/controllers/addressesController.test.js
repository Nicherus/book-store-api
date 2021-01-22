const addressesController = require("../../src/controllers/addressesController");

jest.mock('../../src/models/Address');
jest.mock('sequelize');
const Address = require("../../src/models/Address");

describe('postAddress', () => {
    it('returns complete address when passed correct data', async () => {
        const body = {
            id: 1,
            cep: "25802200",
            state: "Rio de Janeiro",
            city: "Três Rios",
            neighborhood: "Centro",
            street: "Rua Presidente Vargas",
            number: "206"
        };
        const expected = body;
		Address.create.mockResolvedValue(body);

		const result = await addressesController.postAddress(body);
		expect(result).toBe(expected);
    });
});