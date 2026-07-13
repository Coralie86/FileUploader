
const { Router } = require("express")
const uploadController = require("../controller/uploadController")
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

const uploadRouter = Router();

uploadRouter.get('/', uploadController.uploadFormGet);
uploadRouter.post('/', upload.single('uploadedFile'), uploadController.uploadFormPost);

module.exports = uploadRouter