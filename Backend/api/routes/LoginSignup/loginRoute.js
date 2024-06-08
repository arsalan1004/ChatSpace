const {
  googleLoginController,
} = require("../../controllers/LoginSignup/googleControllers/googleLoginController");
const {
  loginController,
} = require("../../controllers/LoginSignup/loginController");

const loginRouter = require("express").Router();

// SIGNUP ROUTE

loginRouter.post("/", loginController);
loginRouter.post("/google", googleLoginController);

module.exports = {
  loginRouter,
};
