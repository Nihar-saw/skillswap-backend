const askGrok=require("./grokService");

const generateSprint=async(tasks)=>{

const prompt=`

Create Agile sprints.

Tasks

${JSON.stringify(tasks)}

Return

Sprint 1

Sprint 2

Sprint 3

Sprint 4

`;

return await askGrok(prompt);

};

module.exports={generateSprint};