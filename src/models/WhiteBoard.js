const mongoose = require("mongoose");

const whiteboardSchema = new mongoose.Schema({

    roomId:{
        type:String,
        required:true,
        unique:true
    },

    elements:[
        {
            type:Object
        }
    ],

    lastEditedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
"Whiteboard",
whiteboardSchema
);