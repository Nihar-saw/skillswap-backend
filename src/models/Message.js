const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    emoji: String,
});

const messageSchema = new mongoose.Schema({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },

    roomId:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },

    startup:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Startup"
    },

    attachments:[
        {
            fileName:String,
            fileUrl:String,
            fileType:String
        }
    ],

    replyTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:null
    },

    reactions:[reactionSchema],

    isPinned:{
        type:Boolean,
        default:false
    },

    edited:{
        type:Boolean,
        default:false
    },

    deleted:{
        type:Boolean,
        default:false
    },

    status:{
        type:String,
        enum:["sent","delivered","read"],
        default:"sent"
    }

},{
    timestamps:true
});

module.exports=mongoose.model("Message",messageSchema);