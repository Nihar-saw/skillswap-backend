const askGrok =
require("./grokService");

const analyzeStartup =
async(idea)=>{

const prompt=`

You are a startup consultant.

Analyze this startup idea.

${idea}

Return ONLY JSON.

{

"marketAnalysis":"",

"competitors":"",

"revenueModel":"",

"risks":"",

"roadmap":"",

"successScore":0

}

`;

return await askGrok(prompt);

};

module.exports={
analyzeStartup
};