const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { collection: "Conversations", timestamps: true }
);

const ConversationModel = mongoose.model("Conversations", ConversationSchema);

module.exports = {
  ConversationModel,
};
