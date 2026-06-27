const MeetingRoom = require("../models/MeetingRoom");

const createMeeting = (data) => {
  return MeetingRoom.create(data);
};

const getMeeting = (roomId) => {
  return MeetingRoom.findOne({ roomId });
};

module.exports = {
  createMeeting,
  getMeeting,
};
