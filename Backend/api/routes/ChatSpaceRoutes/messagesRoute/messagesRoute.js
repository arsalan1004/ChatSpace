const messageRouter = require("express").Router();
const {
  postMessage,
  getMessages,
} = require("../../../controllers/ChatSpaceControllers/messageController/messageController.js");

// add messages
messageRouter.post("/", postMessage);

// get messages
messageRouter.get("/:conversationId", getMessages);

module.exports = {
  messageRouter,
};
