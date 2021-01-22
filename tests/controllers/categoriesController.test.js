const categoriesController = require("../../src/controllers/categoriesController");
const ForbiddenError = require("../../src/errors/ForbiddenError");

jest.mock('../../src/models/Category');
jest.mock('sequelize');
const Category = require("../../src/models/Category");

describe('postCategory', () => {
    it('returns category', async () => {
        const category = { name: "Categoria" };
        const expected = category;
		Category.create.mockResolvedValue(category);

		const result = await categoriesController.postCategory(category);
		expect(result).toBe(expected);
    });
});

describe('getCategories', () => {
    it('returns categories array', async () => {
        const categories = [{ 
            id: 1,
            name: "Categoria",
            createdAt: "2021",
            updatedAt: "2021",
            products: [{ id: 1 }, { id: 2 }]    
        }];
        const expected = categories;
		Category.findAll.mockResolvedValue(categories);

		const result = await categoriesController.getCategories();
		expect(result).toBe(expected);
    });
});

describe('getCategoriesById', () => {
    it('returns a category', async () => {
        const category = { 
            id: 1,
            name: "Categoria",
            createdAt: "2021",
            updatedAt: "2021"   
        };
        const expected = category;
		Category.findOne.mockResolvedValue(category);

		const result = await categoriesController.getCategoriesById();
		expect(result).toBe(expected);
    });
});

describe('updateCategory', () => {
    it('returns a category updated', async () => {
        const category = { 
            id: 1,
            name: "Categoria",
            createdAt: "2021",
            updatedAt: "2021",
            save: () => 0   
        };
        const updatedCategory = { 
            id: 1,
            name: "newCategory",
            createdAt: "2021",
            updatedAt: "2021"   
        };

        const expected = updatedCategory;
		Category.findByPk.mockResolvedValue(category);

		const result = await categoriesController.updateCategory(1, updatedCategory.name);
		expect(result).toEqual(
            expect.objectContaining(updatedCategory)
        );
    });
});

describe('getCategoriesById', () => {
    it('returns a category', async () => {
        const category = { 
            id: 1,
            name: "Categoria",
            createdAt: "2021",
            updatedAt: "2021"   
        };
        const expected = category;
		Category.findOne.mockResolvedValue(category);

		const result = await categoriesController.getCategoriesById();
		expect(result).toBe(expected);
    });
});

describe('validateExistsCategoryName', () => {
    it('return error instance of ForbiddenError', async () => {
        const expected = ForbiddenError;
		Category.findOne.mockResolvedValue(1);

		const fn = async () => {
            await categoriesController.validateExistsCategoryName()
        }
        expect(fn).rejects.toThrow(expected);
    })
});