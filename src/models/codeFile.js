const mongoose=require("mongoose");

const codeFileSchema=new mongoose.Schema({

    session:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CodeSession"
    },

    filename:String,

    language:String,

    content:String

},{
timestamps:true
});

module.exports=
mongoose.model(
"CodeFile",
codeFileSchema
);