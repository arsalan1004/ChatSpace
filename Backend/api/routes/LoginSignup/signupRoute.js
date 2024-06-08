const {
  signupController,
} = require("../../controllers/LoginSignup/signupController");
const {
  googleSignupController,
} = require("../../controllers/LoginSignup/googleControllers/googleSignupController");

const signupRouter = require("express").Router();

// SIGNUP ROUTE
signupRouter.post("/", signupController);
signupRouter.post("/google", googleSignupController);

module.exports = {
  signupRouter,
};
