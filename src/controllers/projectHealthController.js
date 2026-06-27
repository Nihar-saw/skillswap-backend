const ProjectHealth =
require("../models/ProjectHealth");

const {
calculateHealth
}=require("../services/ai/projectHealth");

const analyzeHealth =
async(req,res)=>{

try{

const result=
calculateHealth(req.body);

const health=
await ProjectHealth.create({

project:req.body.project,

completedTasks:req.body.completedTasks,

pendingTasks:req.body.pendingTasks,

overdueTasks:req.body.overdueTasks,

openBugs:req.body.openBugs,

score:result.score,

risk:result.risk,

report:result.report

});

res.status(201).json(health);

}
catch(error){

res.status(500).json({

message:error.message

});

}

};

const getHealth =
async(req,res)=>{

const report=
await ProjectHealth.findOne({

project:req.params.projectId

});

res.json(report);

};

module.exports={

analyzeHealth,

getHealth

};