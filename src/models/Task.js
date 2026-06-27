const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        default:""
    },

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    status:{
        type:String,
        enum:[
            "Todo",
            "In Progress",
            "Review",
            "Completed"
        ],
        default:"Todo"
    },

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

    dueDate:Date

},
{
    timestamps:true
});

module.exports=
mongoose.model(
"Task",
taskSchema
);