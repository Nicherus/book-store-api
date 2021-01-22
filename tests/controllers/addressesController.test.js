const addressesController = require("../../src/controllers/addressesController");

jest.mock('../../src/models/Address');
jest.mock('sequelize');
const Address = require("../../src/models/Address");

describe('postAddress', () => {
    it('returns complete address when passed correct data', async () => {
        const address = {
            id: 1,
            cep: "25802200",
            state: "Rio de Janeiro",
            city: "Três Rios",
            neighborhood: "Centro",
            street: "Rua Presidente Vargas",
            number: "206"
        };
        const expected = address;
		Address.create.mockResolvedValue(address);

		const result = await addressesController.postAddress(address);
		expect(result).toBe(expected);
    });
});

describe('getAddresses', () => {
    it('returns addresses array', async () => {
        const addresses = [{
            id: 1,
            cep: "25802200",
            state: "Rio de Janeiro",
            city: "Três Rios",
            neighborhood: "Centro",
            street: "Rua Presidente Vargas",
            number: "206"
        }];
        const expected = addresses;
		Address.findAll.mockResolvedValue(addresses);

		const result = await addressesController.getAddresses(addresses);
		expect(result).toBe(expected);
    });
});

describe('getAddressById', () => {
    it('returns a address', async () => {
        const address = {
            id: 1,
            cep: "25802200",
            state: "Rio de Janeiro",
            city: "Três Rios",
            neighborhood: "Centro",
            street: "Rua Presidente Vargas",
            number: "206"
        };
        const expected = address;
		Address.findOne.mockResolvedValue(address);

		const result = await addressesController.getAddressById(address);
		expect(result).toBe(expected);
    });
});