const mongoose = require("mongoose");

const architectureReviewSchema = new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },

    architectureScore:{
        type:Number,
        default:0
    },

    securityScore:{
        type:Number,
        default:0
    },

    performanceScore:{
        type:Number,
        default:0
    },

    maintainabilityScore:{
        type:Number,
        default:0
    },

    suggestions:[String],

    report:String

},{
    timestamps:true
});

module.exports = mongoose.model(
"ArchitectureReview",
architectureReviewSchema
);