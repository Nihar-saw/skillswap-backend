const mongoose = require("mongoose");

const deadlinePredictionSchema = new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },

    estimatedCompletion:{
        type:Date,
        required:true
    },

    confidence:{
        type:Number,
        default:90
    },

    delayProbability:{
        type:Number,
        default:0
    },

    teamVelocity:{
        type:Number,
        default:0
    },

    criticalTasks:[
        String
    ],

    recommendation:String

},{
    timestamps:true
});

module.exports = mongoose.model(
"DeadlinePrediction",
deadlinePredictionSchema
);