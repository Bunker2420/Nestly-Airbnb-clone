const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// connecting your cloud account with backend
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

// now next part is defining storage where you want to store
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Nestly_DEV',
      allowedformats: ["png","jpg","jpeg","jfif"], // supports promises as well
    },
  });

// export them
module.exports = {
    cloudinary,
    storage
}