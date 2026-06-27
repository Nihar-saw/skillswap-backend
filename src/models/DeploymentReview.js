const mongoose = require("mongoose");

const deploymentReviewSchema = new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },

    deploymentScore:{
        type:Number,
        default:0
    },

    securityChecks:[String],

    missingConfigurations:[String],

    recommendations:[String],

    report:String

},{
    timestamps:true
});

module.exports = mongoose.model(
"DeploymentReview",
deploymentReviewSchema
);