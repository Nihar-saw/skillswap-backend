const ApiError=
require("../utils/ApiError");

const errorHandler=(

err,

req,

res,

next

)=>{

let statusCode=

err.statusCode||500;

let message=

err.message||

"Internal Server Error";

if(err.name==="ValidationError"){

statusCode=400;

}

if(err.name==="CastError"){

statusCode=400;

message="Invalid ID";

}

if(err.code===11000){

statusCode=400;

message="Duplicate value";

}

res.status(statusCode).json({

success:false,

statusCode,

message,

stack:

process.env.NODE_ENV==="development"

?err.stack

:undefined

});

};

module.exports=errorHandler;