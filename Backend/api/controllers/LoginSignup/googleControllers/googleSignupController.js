const jwt = require("jsonwebtoken");
const { userModel } = require("../../../models/UserModel/userModel");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const googleSignupController = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    await userModel.create({
      username: firstName + lastName,
      password: "",
      firstName,
      lastName,
      email,
      gender: "",
      dateOfBirth: "",
      isUpdated: false,
      totalXp: 0,
      streak: 0,
    });

    const createdUser = await userModel.findOne({ email: email });
    if (createdUser) {
      jwt.sign({ email: createdUser.email }, jwtSecret, {}, (err, token) => {
        if (err) {
          console.log("Error in jwt signing", err);
        } else {
          res
            .cookie("token", token, { secure: true, sameSite: "none" })
            .status(201)
            .json({
              email: createdUser.email,
              firstName: createdUser.firstName,
            });
        }
      });
    } else {
      console.log("User not found at google register controller");
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.log(`Error encountered at register route: ${error}`);
    res.status(409).json({ message: "Username | Email Already Exist" });
  }
};

module.exports = {
  googleSignupController,
};
