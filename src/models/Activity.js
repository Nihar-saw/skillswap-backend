const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
{
    user:{
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

    action:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    metadata:{
        type:Object,
        default:{}
    }

},
{
    timestamps:true
});

module.exports = mongoose.model(
"Activity",
activitySchema
);