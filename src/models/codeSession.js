const mongoose=require("mongoose");

const codeSessionSchema=new mongoose.Schema({

    roomId:{
        type:String,
        required:true,
        unique:true
    },

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },

    language:{
        type:String,
        default:"javascript"
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    active:{
        type:Boolean,
        default:true
    }

},{
timestamps:true
});

module.exports=
mongoose.model(
"CodeSession",
codeSessionSchema
);