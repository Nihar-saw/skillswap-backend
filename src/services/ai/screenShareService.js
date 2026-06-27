const ScreenShare =
require("../models/ScreenShare");

const startSharing =
async(data)=>{

return await ScreenShare.create({

roomId:data.roomId,

presenter:data.presenter,

active:true,

startedAt:new Date()

});

};

const stopSharing =
async(roomId)=>{

return await ScreenShare.findOneAndUpdate(

{roomId},

{

active:false,

endedAt:new Date()

},

{new:true}

);

};

module.exports={

startSharing,

stopSharing

};