const WorkloadReport =
require("../models/WorkloadReport");

const {

balanceWorkload

}=require("../services/ai/workloadBalancer");

const analyzeWorkload=
async(req,res)=>{

try{

const result=

await balanceWorkload(req.body);

const report=

await WorkloadReport.create({

project:req.body.project,

members:result.members,

recommendation:result.recommendation

});

res.status(201).json(report);

}
catch(error){

res.status(500).json({

message:error.message

});

}

};

const getWorkload=
async(req,res)=>{

const report=

await WorkloadReport.findOne({

project:req.params.projectId

})

.populate(

"members.user",

"name email"

);

res.json(report);

};

module.exports={

analyzeWorkload,

getWorkload

};