const askGrok = require("./grokService");

const predictDeadline = async(data)=>{

const prompt=`

You are an Agile Project Manager.

Project Name:
${data.projectName}

Completed Tasks:
${data.completedTasks}

Pending Tasks:
${data.pendingTasks}

Sprint Velocity:
${data.teamVelocity}

Current Deadline:
${data.currentDeadline}

Predict:

1. Estimated Completion Date

2. Confidence Percentage

3. Delay Probability

4. Critical Tasks

5. Recommendation

Return ONLY JSON.

{
"estimatedCompletion":"",
"confidence":0,
"delayProbability":0,
"criticalTasks":[],
"recommendation":""
}

`;

return await askGrok(prompt);

};

module.exports={
predictDeadline
};