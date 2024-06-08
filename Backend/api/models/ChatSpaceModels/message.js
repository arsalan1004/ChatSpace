const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { collection: "Messages", timestamps: true }
);

const MessageModel = mongoose.model("Messages", MessageSchema);

module.exports = {
  MessageModel,
};
