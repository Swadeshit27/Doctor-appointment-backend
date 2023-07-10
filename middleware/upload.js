const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
const path =require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"./public/Images")
    },
    filename: function (req, file, cb) {
        cb(null,`${uuidv4()}_${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage })
module.exports = upload;