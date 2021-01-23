const photosController = require("../../src/controllers/photosController");
const InexistingIdError = require("../../src/errors/InexistingIdError");

jest.mock('../../src/models/Photo');
jest.mock('sequelize');
const Photo = require("../../src/models/Photo");

describe('getAllPhotos', () => {
    it('returns photos array', async () => {
        const photos = [{
            "id": 4,
            "productId": 1,
            "link": "link",
            "updatedAt": "2021-01-21T22:33:27.912Z",
            "createdAt": "2021-01-21T22:33:27.912Z"
        }];
        const expected = photos;
		Photo.findAll.mockResolvedValue(photos);

		const result = await photosController.getAllPhotos(photos);
		expect(result).toBe(expected);
    });
});

describe('getPhotoById', () => {
    it('returns photo', async () => {
        const photo = {
            "id": 4,
            "productId": 1,
            "link": "link",
            "updatedAt": "2021-01-21T22:33:27.912Z",
            "createdAt": "2021-01-21T22:33:27.912Z"
        };
        const expected = photo;
		Photo.findOne.mockResolvedValue(photo);

		const result = await photosController.getPhotoById(photo);
		expect(result).toBe(expected);
    });

    it('return error instance of InexistingIdError', async () => {
        const expected = InexistingIdError;
		Photo.findOne.mockResolvedValue(null);

		const fn = async () => {
            await photosController.getPhotoById()
        }
        expect(fn).rejects.toThrow(expected);
    });
});

describe('getPhotosByProduct', () => {
    it('returns photos array', async () => {
        const photos = [{
            "id": 4,
            "productId": 1,
            "link": "link",
            "updatedAt": "2021-01-21T22:33:27.912Z",
            "createdAt": "2021-01-21T22:33:27.912Z"
        }];
        const expected = photos;
		Photo.findAll.mockResolvedValue(photos);

		const result = await photosController.getPhotosByProduct(photos);
		expect(result).toBe(expected);
    });
});