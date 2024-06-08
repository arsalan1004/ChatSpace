const getUserRouter = require("express").Router();
const  mongoose  = require("mongoose");
const { userModel } = require("../../../models/UserModel/userModel");

getUserRouter.get("/:userId", async (req, res) => {
  try {
    // const objectId =  mongoose.Types.ObjectId(req.params.userId);
    const userData = await userModel.findOne({_id: req.params.userId}, {username: 1, firstName: 1, lastName: 1})
    // console.log(`userData: ${userData}`);
    // console.log(`_id: ${req.params.userId}`);
    const data = {
      username: userData.username,
      fullName: userData.firstName + " " + userData.lastName
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(`Error in getUserRouter: ${error}`);
    res.status(500).json(error);
  }
});

module.exports = {
  getUserRouter,
};
