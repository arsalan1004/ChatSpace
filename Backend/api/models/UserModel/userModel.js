const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true},
    dateOfBirth: { type: String, required: true },
    isUpdated: { type: Boolean, required: true, default: false},
    totalXp: { type: Number, required: true, default:0 },
    streak: { type: Number, required: true, default:0 },
    gem: { type: Number, required: true, default:0},
    trophy: {type: Number, required: true, default:0},
    xpLevel: {type: Number, required: true, default:1},
    XPRequiredForNextLevel: {type: Number, required: true, default:50},
    league:{type: String, required: true, default:"Novice"}
  },
  { timestamps: true, collection: "User" }
);

const userModel = mongoose.model("User", userSchema);

module.exports = {
  userModel,
};