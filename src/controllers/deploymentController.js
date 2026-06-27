const DeploymentReview =
require("../models/DeploymentReview");

const {
analyzeDeployment
}=require("../services/ai/deploymentAdvisor");

const analyze =
async(req,res)=>{

try{

const result=
await analyzeDeployment(req.body);

const review=
await DeploymentReview.create({

project:req.body.project,

deploymentScore:
result.deploymentScore,

securityChecks:
result.securityChecks,

missingConfigurations:
result.missingConfigurations,

recommendations:
result.recommendations,

report:
result.report

});

res.status(201).json(review);

}
catch(error){

res.status(500).json({

message:error.message

});

}

};

const getReview=
async(req,res)=>{

const review=
await DeploymentReview.findOne({

project:req.params.projectId

});

res.json(review);

};

module.exports={

analyze,

getReview

};