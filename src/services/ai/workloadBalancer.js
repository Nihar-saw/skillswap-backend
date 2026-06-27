const askGrok = require("./grokService");

const balanceWorkload = async(data)=>{

const prompt=`

You are an Agile Project Manager.

Project:

${data.projectName}

Team:

${JSON.stringify(data.members)}

Return JSON only.

{

"members":[

{

"name":"",

"assignedTasks":0,

"workload":0,

"productivity":0,

"burnoutRisk":"Low"

}

],

"recommendation":""

}

`;

return await askGrok(prompt);

};

module.exports={

balanceWorkload

};