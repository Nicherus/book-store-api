const { func } = require("joi");
const Photo = require("../models/Photo");

async function getPhotosByProduct(productId) {
    const photos =  await Photo.findAll( {where: {productId}} );
    return photos;
}

async function postPhotos(arrayLinks, productId) {
    
    const arrayInsertPhotos = arrayLinks.map( p => {
        return {link: p, productId}
    });
    await Photo.bulkCreate(arrayInsertPhotos);
}

module.exports = {
    getPhotosByProduct,
    postPhotos,
}