const askGrok = require("./grokService");

const reviewArchitecture = async(data)=>{

const prompt=`

You are a Senior Software Architect.

Analyze this project.

Project Name:
${data.projectName}

Tech Stack:
${data.techStack}

Folder Structure:
${JSON.stringify(data.structure)}

Architecture:
${data.architecture}

Return ONLY JSON.

{

"architectureScore":0,

"securityScore":0,

"performanceScore":0,

"maintainabilityScore":0,

"suggestions":[

""

],

"report":""

}

`;

return await askGrok(prompt);

};

module.exports={
reviewArchitecture
};