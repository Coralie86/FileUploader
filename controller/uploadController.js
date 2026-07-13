const multer = require("multer")
const upload = multer({ dest: "uploads/"});
const prisma = require("../lib/prisma.js")


exports.uploadFormGet = async (req, res) =>{

    const folderList = await prisma.folder.findMany();

    res.render("uploadPage", {user: req.user, folderList: folderList, link: '/upload'});
}

exports.uploadFormPost = async (req, res) => {
    const folderId = parseInt(req.body.folderId);
    const uploadedFile = req.file;

    console.log(req.body)

    await prisma.file.create({
        data:{
            name: uploadedFile.originalname,
            size: uploadedFile.size,
            URL: uploadedFile.path,
            folderId: folderId,
        }
    })

    res.redirect('/');
}