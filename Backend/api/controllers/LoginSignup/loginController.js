const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { userModel } = require("../../models/UserModel/userModel");

const loginController = async (req, res) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    const { username, password } = req.body;
    const foundUser = await userModel
      .findOne({ username: username })
      .then((user) => user);

    if (foundUser) {
      const passOk = bcrypt.compareSync(password, foundUser.password);
      if (passOk) {
        jwt.sign(
          { userId: foundUser._id, username: foundUser.username },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              console.log(console.log("Error in jwt signing at login", err));
            } else {
              res
                .cookie("token", token, { secure: true, sameSite: "none" })
                .status(200)
                .json({
                  id: foundUser?._id,
                  username: foundUser?.username,
                });
            }
          }
        );
      } else {
        res.status(401).json("Unauthorized User");
      }
    } else {
      console.log("User not found at register controller");
      res.status(401).json("User not found");
    }
  } catch (error) {
    console.log(`Error encountered at login route: ${error}`);
    res.status(409).json({ message: "Invalid Credentials" });
  }
};

module.exports = {
  loginController,
};
