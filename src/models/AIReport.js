const mongoose = require("mongoose");

const aiReportSchema = new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },

    summary:String,

    progress:Number,

    risk:String,

    sprintStatus:String,

    recommendations:[String],

    generatedAt:{
        type:Date,
        default:Date.now
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
"AIReport",
aiReportSchema
);