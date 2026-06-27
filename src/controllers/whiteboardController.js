const{

saveBoard,

getBoard

}=require("../services/ai/whiteboardService");

const save=
async(req,res)=>{

try{

const board=
await saveBoard(

req.body.roomId,

req.body.elements,

req.user._id

);

res.json(board);

}
catch(error){

res.status(500).json({

message:error.message

});

}

};

const load=
async(req,res)=>{

const board=
await getBoard(

req.params.roomId

);

res.json(board);

};

module.exports={

save,

load

};