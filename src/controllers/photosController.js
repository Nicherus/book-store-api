const Photo = require("../models/Photo");
const InexistingIdError = require('../errors/InexistingIdError')

async function getAllPhotos() {
    const photos = await Photo.findAll();
    return photos;
}

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

async function deletePhoto(id) {

    await _checkIfPhotoIdExists(id);
    await Photo.destroy( { where: { id } } );
}

async function _checkIfPhotoIdExists(id) {

    const photo = await Photo.findOne( { where: {id} } );
    if(!photo) throw new InexistingIdError();
    return photo;
}

module.exports = {
    getPhotosByProduct,
    postPhotos,
    deletePhoto,
    getAllPhotos
}