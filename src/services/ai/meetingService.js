const MeetingRoom=
require("../models/MeetingRoom");

const createMeeting=
async(data)=>{

return await MeetingRoom.create(data);

};

const getMeeting=
async(roomId)=>{

return await MeetingRoom.findOne({

roomId

});

};

module.exports={

createMeeting,

getMeeting

};