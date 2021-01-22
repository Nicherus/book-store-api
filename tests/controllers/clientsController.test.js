const clientsController = require("../../src/controllers/clientsController");
const InexistingIdError = require("../../src/errors/InexistingIdError");

jest.mock('../../src/models/Client');
jest.mock('sequelize');
const Client = require("../../src/models/Client");

describe('postClient', () => {
    it('returns complete client when passed correct data', async () => {
        const newClient = { 
            name: "Fulano", 
            cpf: "11111111111", 
            email: "fulano@fulano.com", 
            creditCard: "1111111111111111" 
        };
        const expected = newClient;
		Client.create.mockResolvedValue(newClient);

		const result = await clientsController.postClient(newClient);
		expect(result).toBe(expected);
    });
});

describe('getAllClients', () => {
    it('returns a clients array', async () => {
        const clients = [{ 
            name: "Fulano", 
            cpf: "11111111111", 
            email: "fulano@fulano.com", 
            creditCard: "1111111111111111" 
        }];
        const expected = clients;
		Client.findAll.mockResolvedValue(clients);

		const result = await clientsController.getAllClients();
		expect(result).toBe(expected);
    });
});

describe('getClientById', () => {
    it('returns a client', async () => {
        const client = {
            id: 1, 
            name: "Fulano", 
            cpf: "11111111111", 
            email: "fulano@fulano.com", 
            creditCard: "1111111111111111" 
        };
        const expected = client;
		Client.findByPk.mockResolvedValue(client);

		const result = await clientsController.getClientById(1);
		expect(result).toBe(expected);
    });

    it('returns a error instance of InexistingIdError', async () => {
        const expected = InexistingIdError;
		Client.findByPk.mockResolvedValue(null);

		const fn = async (id) => {
            await clientsController.getClientById(id)
        }
        expect(fn).rejects.toThrow(expected)
    });
});