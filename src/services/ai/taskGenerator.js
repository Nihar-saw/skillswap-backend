const askGrok=require("./grokService");

const generateTasks=async(project)=>{

const prompt=`

You are an expert software architect.

Project

${project}

Break this into development tasks.

Return JSON

[
{
"title":"",
"description":"",
"priority":"",
"estimatedHours":0
}
]

`;

return await askGrok(prompt);

};

module.exports={generateTasks};