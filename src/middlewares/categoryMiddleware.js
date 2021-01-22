const categoriesSchemas = require("../schemas/categoriesSchema");
const { validateExistsCategoryName, validateExistsCategoryNameUpdate } = require("../controllers/categoriesController");
const ForbiddenError = require("../errors/ForbiddenError");
const InexistingIdError = require("../errors/InexistingIdError");

async function categoryMiddleware(req, res, next) { 
    const toValidate = {name: req.body.name}
    const validation = categoriesSchemas.postCategory.validate(toValidate);
    if(validation.error) return res.status(422).send({error: validation.error.details[0].message});
    try {
        await validateExistsCategoryName(req.body.name);
        next();
    } catch(err) {
        if(err instanceof ForbiddenError) return res.sendStatus(403);

        return res.sendStatus(500);
    }
}

async function categoryUpdateMiddleware(req, res, next) { 
    const toValidate = {name: req.body.name}
    const validation = categoriesSchemas.postCategory.validate(toValidate);
    if(validation.error) return res.status(422).send({error: validation.error.details[0].message});
    
    next();

}

module.exports = {
    categoryMiddleware, categoryUpdateMiddleware
};