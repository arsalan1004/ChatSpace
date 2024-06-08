const router = require("express").Router();
const {
  getConvo,
  addNewConvo,
} = require("../../../controllers/ChatSpaceControllers/conversationController/convoController.js");

// NEW CONVERSATION
router.post("/", addNewConvo);

// GET CONVERSATION
router.get("/:userId", getConvo);

module.exports = {
  router,
};
