const { Router } = require("express")
const homeController = require("../controller/homeController")
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

const homeRouter = Router();

homeRouter.get('/', homeController.homeGet);
homeRouter.get('/newFolder', homeController.newFolderGet);
homeRouter.post('/newFolder', homeController.newFolderPost);

homeRouter.get('/:folderId/edit', homeController.folderEditGet);
homeRouter.post('/:folderId/edit', homeController.folderEditPost);

homeRouter.get('/:folderId/fileList', homeController.fileListGet);

homeRouter.post('/:folderId/delete', homeController.folderDelete);

homeRouter.post('/:folderId/upload',  upload.single('uploadedFile'), homeController.fileUploadFolder);

module.exports = homeRouter