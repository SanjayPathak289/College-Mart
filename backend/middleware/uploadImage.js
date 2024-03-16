const { Promise } = require("mongoose");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto"
};

const upload = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (err, res) => {
            if (res && res.secure_url) {
                console.log(res.secure_url);
                return resolve(res.secure_url);
            }
            console.log(err.message);
            return reject({ message: err.message })
        })
    })
}
const uploadImage = (req, res, next) => {
    try {
        // const token = req.cookies.jwt;
        // console.log(req.body.image);
        // const verifyUser = jwt.verify(token, "sanjaypathakisagoodboy");
        // console.log(verifyUser);
        // req.user = verifyUser;
        next();
    } catch (error) {
        return res.json({ message: "Error" });
    }
}
module.exports = uploadImage;