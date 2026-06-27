const Whiteboard = require("../models/Whiteboard");

const saveBoard = (roomId, elements, user) => {
  return Whiteboard.findOneAndUpdate(
    { roomId },
    {
      elements,
      lastEditedBy: user,
    },
    {
      new: true,
      upsert: true,
    }
  );
};

const getBoard = (roomId) => {
  return Whiteboard.findOne({ roomId });
};

module.exports = {
  saveBoard,
  getBoard,
};
