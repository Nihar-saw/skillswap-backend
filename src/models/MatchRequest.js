const mongoose = require("mongoose");

const matchRequestSchema = new mongoose.Schema({

    requester:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
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

    requiredSkills:[String],

    description:String

},{
    timestamps:true
});

module.exports = mongoose.model(
"MatchRequest",
matchRequestSchema
);