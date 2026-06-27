const askGrok = require("./grokService");

const generateRecommendations = async(data)=>{

const prompt=`

You are an AI Technical Project Manager.

Project:

${data.projectName}

Description:

${data.description}

Required Skills:

${JSON.stringify(data.requiredSkills)}

Team Members:

${JSON.stringify(data.team)}

Tasks:

${JSON.stringify(data.tasks)}

Generate recommendations.

Return JSON only.

[
{
"type":"",
"score":0,
"recommendation":"",
"reason":""
}
]

`;

return await askGrok(prompt);

};

module.exports={
generateRecommendations
};