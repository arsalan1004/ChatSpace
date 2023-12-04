const router = require("express").Router();
const { ConversationModel } = require("../models/conversation.js");

// NEW CONVERSATION
router.post("/", async (req, res) => {
  const conversation = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await conversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

// GET CONVERSATION
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [req.params.userId] },
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = {
  router,
};
