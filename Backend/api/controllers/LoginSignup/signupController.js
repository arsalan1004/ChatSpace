const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { userModel } = require("../../models/UserModel/userModel");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const signupController = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const {
      username,
      password,
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth,
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, salt);

    await userModel.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth,
      isUpdated: false,
      totalXp: 0,
      streak: 0,
    });

    const createdUser = await userModel.findOne({ username: username });
    if (createdUser) {
      jwt.sign(
        { userId: createdUser._id, username: createdUser.username },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            console.log("Error in jwt signing", err);
          } else {
            res
              .cookie("token", token, { secure: true, sameSite: "none" })
              .status(201)
              .json({
                userId: createdUser._id.toString(),
                username: createdUser.username,
              });
          }
        }
      );
    } else {
      console.log("User not found at register controller");
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.log(`Error encountered at register route: ${error}`);
    res.status(409).json({ message: "Invalid Credentials" });
  }
};

module.exports = {
  signupController,
};
