const Recommendation =
require("../models/Recommendation");

const {

generateRecommendations

}=require("../services/ai/recommendationEngine");

const createRecommendations=
async(req,res)=>{

try{

const results=
await generateRecommendations(req.body);

const saved=[];

for(const item of results){

const recommendation=
await Recommendation.create({

project:req.body.project,

user:req.user._id,

type:item.type,

score:item.score,

recommendation:item.recommendation,

reason:item.reason

});

saved.push(recommendation);

}

res.status(201).json(saved);

}
catch(error){

res.status(500).json({

message:error.message

});

}

};

const getRecommendations=
async(req,res)=>{

const recommendations=

await Recommendation.find({

project:req.params.projectId

})

.sort({

score:-1

});

res.json(recommendations);

};

module.exports={

createRecommendations,

getRecommendations

};