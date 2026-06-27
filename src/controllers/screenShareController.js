const{

startSharing,

stopSharing

}=require("../services/ai/screenShareService");

const start=
async(req,res)=>{

try{

const share=

await startSharing({

roomId:req.body.roomId,

presenter:req.user._id

});

res.status(201).json(share);

}
catch(error){

res.status(500).json({

message:error.message

});

}

};

const stop=
async(req,res)=>{

const share=

await stopSharing(

req.body.roomId

);

res.json(share);

};

module.exports={

start,

stop

};