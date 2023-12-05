const getUserRouter = require("express").Router();
const { userModel } = require("../models/userModel");

getUserRouter.get("/:userId", async (req, res) => {
  try {
    const userData = await userModel.findById(req.params.userId);
    res.status(200).json(userData);
  } catch (error) {
    console.log(`Error in getUserRouter: ${error}`);
    res.status(500).json(error);
  }
});

module.exports = {
  getUserRouter,
};
