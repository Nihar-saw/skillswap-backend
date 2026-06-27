const askGrok = require("./grokService");

const analyzeDeployment = async(data)=>{

const prompt = `

You are an experienced DevOps Engineer.

Analyze this deployment configuration.

Project:
${data.projectName}

Backend:
${data.backend}

Frontend:
${data.frontend}

Deployment Platform:
${data.platform}

Environment Variables:
${JSON.stringify(data.env)}

Security:
${JSON.stringify(data.security)}

Docker:
${data.docker}

CI/CD:
${data.cicd}

Return ONLY JSON.

{
"deploymentScore":0,
"securityChecks":[],
"missingConfigurations":[],
"recommendations":[],
"report":""
}

`;

return await askGrok(prompt);

};

module.exports={
analyzeDeployment
};