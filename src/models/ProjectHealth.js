const mongoose = require("mongoose");

const projectHealthSchema = new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },

    score:{
        type:Number,
        default:100
    },

    completedTasks:{
        type:Number,
        default:0
    },

    pendingTasks:{
        type:Number,
        default:0
    },

    overdueTasks:{
        type:Number,
        default:0
    },

    openBugs:{
        type:Number,
        default:0
    },

    risk:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Low"
    },

    report:String

},{
    timestamps:true
});

module.exports =
mongoose.model(
"ProjectHealth",
projectHealthSchema
);