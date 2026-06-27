const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    assignedTasks:Number,

    workload:Number,

    productivity:Number,

    burnoutRisk:String

});

const workloadSchema = new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },

    members:[memberSchema],

    recommendation:String

},{
    timestamps:true
});

module.exports = mongoose.model(
"WorkloadReport",
workloadSchema
);