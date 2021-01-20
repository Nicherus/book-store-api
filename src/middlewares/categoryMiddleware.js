const categoriesSchemas = require("../schemas/categoriesSchema");
const { validateExistsCategoryName } = require("../controllers/categoriesController");
const ForbiddenError = require("../errors/ForbiddenError");

async function categoryMiddleware(req, res, next) { 
    const validation = categoriesSchemas.postCategory.validate(req.body);
    if(validation.error) return res.status(422).send({error: validation.error.details[0].message});

    try {
        await validateExistsCategoryName(req.body.name);
        next();
    } catch(err) {
        if(err instanceof ForbiddenError) return res.sendStatus(403);

        return res.sendStatus(500);
    }
}

module.exports = categoryMiddleware;