const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
  },
  { collection: "Users" },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);

module.exports = {
  userModel,
};
