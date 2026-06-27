const ArchitectureReview =
require("../models/ArchitectureReview");

const {

reviewArchitecture

}=require("../services/ai/architectureReviewer");

const analyzeArchitecture=
async(req,res)=>{

try{

const result=
await reviewArchitecture(req.body);

const review=
await ArchitectureReview.create({

project:req.body.project,

architectureScore:
result.architectureScore,

securityScore:
result.securityScore,

performanceScore:
result.performanceScore,

maintainabilityScore:
result.maintainabilityScore,

suggestions:
result.suggestions,

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

const getArchitectureReview=
async(req,res)=>{

const review=
await ArchitectureReview.findOne({

project:req.params.projectId

});

res.json(review);

};

module.exports={

analyzeArchitecture,

getArchitectureReview

};