const prisma  = require("../lib/prisma.js")
const bcrypt = require("bcryptjs")

async function populate() {
    const user = await prisma.user.create({
        data: {
            email: "pof@pof.com",
            name : "Coralie",
            password: await bcrypt.hash("Test123?", 10),
            folders: {
                create: {
                    title: "Folder Title",
                    description: "Folder description"
                }
            }
        },
        include: {
            folders: true,
        }
    });

    console.log("Created user:", user);
}

populate()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
})