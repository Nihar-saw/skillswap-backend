const ScreenShare = require("../models/ScreenShare");

const startSharing = (data) => {
  return ScreenShare.create({
    roomId: data.roomId,
    presenter: data.presenter,
    active: true,
    startedAt: new Date(),
  });
};

const stopSharing = (roomId) => {
  return ScreenShare.findOneAndUpdate(
    { roomId },
    {
      active: false,
      endedAt: new Date(),
    },
    { new: true }
  );
};

module.exports = {
  startSharing,
  stopSharing,
};
