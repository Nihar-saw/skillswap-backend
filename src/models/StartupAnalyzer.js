const mongoose = require("mongoose");

const startupAnalysisSchema = new mongoose.Schema({

    startup:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Startup"
    },

    analyzedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    idea:String,

    marketAnalysis:String,

    competitors:String,

    revenueModel:String,

    risks:String,

    roadmap:String,

    successScore:Number,

    investorPitch:String

},{
    timestamps:true
});

module.exports =
mongoose.model(
"StartupAnalysis",
startupAnalysisSchema
);