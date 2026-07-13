require("dotenv").config();
const express = require("express")
const path = require("node:path")
const app = express();
const bcrypt = require("bcryptjs")
const passport = require("passport");
const session = require("express-session");
require("./config/passport")
const pg = require("pg")
const prisma = require("./lib/prisma.js")
const {PrismaSessionStore} = require("@quixo3/prisma-session-store");

const homeRouter = require("./router/homeRouter")
const loginRouter = require("./router/loginRouter")
const uploadRouter = require("./router/uploadRouter")


// Set up views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up assets
const assetspath = path.join(__dirname, "public");
app.use(express.static(assetspath));

// Set up encoding
app.use(express.urlencoded({extended: true}));

// Set session
app.use(session({
    store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }) , 
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

// Set up PORT
const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Connected to Inventory app. Listening on port ${PORT}`)
})

app.use("/", homeRouter);
app.use("/login", loginRouter)
app.use("/upload", uploadRouter)