const Whiteboard =
require("../models/Whiteboard");

const saveBoard =
async(roomId,elements,user)=>{

return await Whiteboard.findOneAndUpdate(

{roomId},

{

elements,

lastEditedBy:user

},

{

new:true,

upsert:true

}

);

};

const getBoard =
async(roomId)=>{

return await Whiteboard.findOne({

roomId

});

};

module.exports={

saveBoard,

getBoard

};