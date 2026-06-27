const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },

    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    originalName:String,

    url:String,

    publicId:String,

    size:Number,

    mimeType:String

},{
    timestamps:true
});

module.exports = mongoose.model(
"File",
fileSchema
);