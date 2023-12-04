const messageRouter = require("express").Router();
const { MessageModel } = require("../models/message.js");

// add messages
messageRouter.post("/", async (req, res) => {
  const newMessage = new MessageModel(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get messages
messageRouter.get("/:conversationId", async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  messageRouter,
};
