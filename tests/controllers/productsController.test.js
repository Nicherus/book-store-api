const productsController = require('../../src/controllers/productsController');
const Product = require('../../src/models/Product');
jest.mock('../../src/models/Product');
// jest.mock('../../src/controllers/productsController');
jest.mock('sequelize');

const InexistingIdError = require('../../src/errors/InexistingIdError');


// describe('Test decrementProductStock', () => {

//     it('should return an object with a decrement in amountStock ', async () => {
//         const id = 1;
//         const expectResult = {
//             "id": 1,
//             "name": "Harry Potter - Calice de Fogo",
//             "price": 10000,
//             "author": "J.K Rowling",
//             "year": 2005,
//             "synopsis": "Hogwarts",
//             "pages": 300,
//             "amountStock": 3,
//             "createdAt": "2021-01-21T19:07:18.944Z",
//             "updatedAt": "2021-01-21T19:07:18.944Z",
//         };

//         productsController.decrementProductStock.mockResolvedValueOnce({
//             "id": 1,
//             "name": "Harry Potter - Calice de Fogo",
//             "price": 10000,
//             "author": "J.K Rowling",
//             "year": 2005,
//             "synopsis": "Hogwarts",
//             "pages": 300,
//             "amountStock": 4,
//             "createdAt": "2021-01-21T19:07:18.944Z",
//             "updatedAt": "2021-01-21T19:07:18.944Z",
//         });

//         const result = await productsController.decrementProductStock(id, 1);

//         expect(result).toEqual(expectResult);
//     })
// })

// jest.requireActual('../../src/controllers/productsController');

describe('Test checkIfProductIdExists', () => {

    it('should throw an error Id does not exists ', () => {
        const id = -1;
        Product.findOne.mockResolvedValue(null);

        expect( async () => {
            await productsController.checkIfProductIdExists(id);
        }).rejects.toThrow(InexistingIdError);
    })

    it('should return an object ', async () => {
        const id = 1;
        const expectResult = {id: 1};
        Product.findOne.mockResolvedValue({id: 1 });

        const result = await productsController.checkIfProductIdExists(id);

        expect(result).toEqual(expectResult);
    })
})