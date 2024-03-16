const multer = require("multer");

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, "./public/Images")
        },
        filename: function (req, file, cb) {
            return cb(null, file.originalname)
        }
    })

const upload = multer({ storage });
var uploadM = upload.fields([{ name: "image" }])

module.exports = uploadM;