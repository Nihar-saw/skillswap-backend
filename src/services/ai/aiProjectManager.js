const askGrok = require("./grokService");

const analyzeProject = async(project)=>{

const prompt = `

You are an expert Agile Project Manager.

Project:

${JSON.stringify(project)}

Analyze the project.

Generate

1. Progress

2. Sprint Status

3. Risks

4. Recommendations

Return JSON

{

"progress":0,

"risk":"",

"sprintStatus":"",

"summary":"",

"recommendations":[]

}

`;

return await askGrok(prompt);

};

module.exports={

analyzeProject

};