const { MessageModel } = require("../../../../models/ChatSpaceModels/message");

const getLatestMsg = async (convoId) => {
  try {
    const latestMsg = await MessageModel.find(
      { conversationId: convoId },
      { text: 1, createdAt: 1, _id: 0 }
    )
      .sort({ createdAt: -1 })
      .limit(1);

    return latestMsg;
  } catch (error) {
    console.log(`Error encounterd at getLatestsg controller: ${error}`);
    return false;
  }
};

module.exports = {
  getLatestMsg,
};
