const mongoose = require("mongoose");

const screenShareSchema = new mongoose.Schema({

    roomId:{
        type:String,
        required:true
    },

    presenter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    active:{
        type:Boolean,
        default:false
    },

    startedAt:{
        type:Date
    },

    endedAt:{
        type:Date
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "ScreenShare",
    screenShareSchema
);