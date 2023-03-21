const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "drnvbpbe1",
  api_key: "141418213141799",
  api_secret: "6BohNWUKjCRjCmrODZwn6p_JKXs"
});


// Upload
const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
      folder: 'posts',
    });
};

const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id);
};
  
module.exports = {
    uploadImage,
    deleteImage,
};