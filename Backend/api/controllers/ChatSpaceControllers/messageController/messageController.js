const { MessageModel } = require("../../../models/ChatSpaceModels/message");

const postMessage = async (req, res) => {
  const newMessage = new MessageModel(req.body);
  console.log("in Post message Bacckend")
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  postMessage,
  getMessages,
};
