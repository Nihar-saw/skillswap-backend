const {
createMeeting,
getMeeting
}=require("../services/ai/meetingService");

const createRoom=
async(req,res)=>{

try{

const meeting=
await createMeeting({

project:req.body.project,

roomId:req.body.roomId,

title:req.body.title,

host:req.user._id

});

res.status(201).json(meeting);

}
catch(error){

res.status(500).json({

message:error.message

});

}

};

const getRoom = async (req, res) => {
  const room = await getMeeting(req.params.roomId);
  res.json(room);
};

const listMeetings = async (req, res) => {
  try {
    const MeetingRoom = require("../models/MeetingRoom");
    const meetings = await MeetingRoom.find({
      $or: [{ host: req.user._id }, { "participants.user": req.user._id }],
    })
      .sort({ createdAt: -1 })
      .populate("host", "name email")
      .populate("project", "title");
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRoom, getRoom, listMeetings };