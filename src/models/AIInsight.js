const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },

    type:{
        type:String,
        enum:[
            "Risk",
            "Performance",
            "Task",
            "Sprint",
            "Developer",
            "Security"
        ]
    },

    title:String,

    description:String,

    priority:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High",
            "Critical"
        ],
        default:"Medium"
    },

    resolved:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
"AIInsight",
insightSchema);