const { func } = require("joi");
const Photo = require("../models/Photo");

async function getPhotosByProduct(producId) {
    // considerando que o id foi tratado antes
    const photos =  await Photo.findAll( {where: {producId}} );
    return photos;
}

async function postPhoto(link, productId) {
    const photo = await Photo.create( {link, producId});
    return photo;
}

module.exports = {
    getPhotosByProduct,
    postPhoto
}