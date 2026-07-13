const { Router } = require("express")
const loginController = require("../controller/loginController")

const loginRouter = Router();

loginRouter.get('/', loginController.loginGet);
loginRouter.post('/', loginController.loginPost);
loginRouter.get('/logout', loginController.logout);

module.exports = loginRouter