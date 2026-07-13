const prisma = require("../lib/prisma.js")

exports.homeGet = async (req, res) => {

    const folderList = await prisma.folder.findMany();

    res.render("home", {user: req.user, folders: folderList})
}

exports.newFolderGet = async (req, res) => {
    res.render('newFolder', {user: req.user})
}

exports.newFolderPost = async (req, res) => {
    const newFolder = req.body;

    await prisma.folder.create({
        data: {
            title: newFolder.titleFolder,
            description: newFolder.descriptionFolder,
            creator: {
                connect: {
                    id: req.user.id,
                }
            }
        }
    });

    res.redirect('/');
}

exports.folderEditGet = async (req, res) => {
    const folderId = parseInt(req.params.folderId);

    const folder = await prisma.folder.findUnique({
        where: {
            id: folderId,
        }
    })

    res.render('newFolder', {user: req.user, folder:folder, link: `/${folderId}/upload`})
}

exports.folderEditPost = async (req, res) => {
    const folderId = parseInt(req.params.folderId);
    const changes = req.body;
    
    await prisma.folder.update({
        where: {
            id: folderId,
        },
        data: {
            title:  changes.titleFolder,
            description: changes.descriptionFolder
        }
    })
    res.redirect('/');
}

exports.folderDelete = async (req, res, next) => {
    const folderToBeDeleted = parseInt(req.params.folderId);

    try {
        await prisma.folder.delete({
            where: {
                id: folderToBeDeleted,
            },        
        })
    res.redirect('/');

    } catch(err) {
        console.error(err)
        return next(err)
    }   
}

exports.fileListGet = async (req, res) => {
    const folderId = parseInt(req.params.folderId);

    const fileList = await prisma.file.findMany({
        where: {
            folderId : folderId,
        }
    })

    res.render('fileList', {fileList: fileList, folderId: folderId, user: req.user})
}

exports.fileUploadFolder = async (req, res) => {
    const folderId = parseInt(req.params.folderId);
        const uploadedFile = req.file;    
    
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