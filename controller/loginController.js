const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma.js");
const passport = require("passport");

exports.loginGet = async (req, res) => {
    const errors = req.session.messages || [];

    req.session.messages = [];

    if(errors.length > 0){
        return (res.render('login', { errors: errors.map((msg) => ({msg}) )}))
    }

    res.render("login")
}

exports.loginPost = passport.authenticate("local", {
    successRedirect : "/",
    failureRedirect : "/login",
    failureMessage : true
})

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect("/");
    })
}