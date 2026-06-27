const AIReport =
require("../models/AIReport");

const AIInsight =
require("../models/AIInsight");

const {
analyzeProject
}=require("../services/ai/aiProjectManager");

const {
generateInsights
}=require("../services/ai/insightGenerator");

const analyze=async(req,res)=>{

try{

const result=
await analyzeProject(req.body);

const report=
await AIReport.create({

project:req.body.project,

summary:result.summary,

progress:result.progress,

risk:result.risk,

sprintStatus:result.sprintStatus,

recommendations:result.recommendations

});

const insights=
await generateInsights(req.body);

const saved=[];

for(const insight of insights){

saved.push(

await AIInsight.create({

project:req.body.project,

type:"Risk",

title:insight.title,

description:insight.description,

priority:insight.priority

})

);

}

res.json({

report,

insights:saved

});

}
catch(error){

res.status(500).json({

message:error.message

});

}

};

module.exports={
analyze
};