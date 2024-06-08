const jwt = require("jsonwebtoken");
const { userModel } = require("../../../models/UserModel/userModel");

const googleLoginController = async (req, res) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    const { email } = req.body;
    const foundUser = await userModel
      .findOne({ email: email })
      .then((user) => user);

    if (foundUser) {
      jwt.sign({ email: foundUser.email }, jwtSecret, {}, (err, token) => {
        if (err) {
          console.log(console.log("Error in jwt signing at login", err));
        } else {
          res
            .cookie("token", token, { secure: true, sameSite: "none" })
            .status(200)
            .json({
              email: foundUser?.email,
            });
        }
      });
    } else {
      console.log("User not found at register controller");
      res.status(401).json("User not registered");
    }
  } catch (error) {
    console.log(`Error encountered at login route: ${error}`);
    res.status(409).json({ message: "Invalid Credentials" });
  }
};

module.exports = {
  googleLoginController,
};
