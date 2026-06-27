const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    type:{
        type:String,
        enum:[
            "Developer",
            "Freelancer",
            "Founder",
            "Startup",
            "Skill",
            "Project"
        ]
    },

    score:{
        type:Number,
        default:0
    },

    recommendation:String,

    reason:String

},{
    timestamps:true
});

module.exports = mongoose.model(
"Recommendation",
recommendationSchema
);