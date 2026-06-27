const mongoose=require("mongoose");

const participantSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    joinedAt:{
        type:Date,
        default:Date.now
    }

});

const meetingRoomSchema=new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },

    roomId:{
        type:String,
        required:true,
        unique:true
    },

    title:String,

    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    participants:[
        participantSchema
    ],

    active:{
        type:Boolean,
        default:true
    }

},{
timestamps:true
});

module.exports=
mongoose.model(
"MeetingRoom",
meetingRoomSchema
);