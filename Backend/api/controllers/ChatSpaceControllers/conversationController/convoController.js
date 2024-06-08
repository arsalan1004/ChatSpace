const {
  ConversationModel,
} = require("../../../models/ChatSpaceModels/conversation");
const { getLatestMsg } = require("./latestMessage/getLatestMsg");

const addNewConvo = async (req, res) => {
  const conversation = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await conversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

const getConvo = async (req, res) => {
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [req.params.userId] },
    });

    const finalConvo = await Promise.all(
      conversation.map(async (convo) => {
        const latestMsg = await getLatestMsg(convo._id);
        return {
          _id: convo._id,
          members: convo.members,
          lastMessage: latestMsg[0],
        };
      })
    );

    res.status(200).json(finalConvo);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  addNewConvo,
  getConvo,
};
