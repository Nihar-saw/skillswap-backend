const askGrok =
require("./grokService");

const generatePitch =
async(idea)=>{

const prompt=`

Create an investor pitch.

Startup:

${idea}

Sections:

Problem

Solution

Target Market

Revenue

Competitive Advantage

Funding Required

Vision

`;

return await askGrok(prompt);

};

module.exports={
generatePitch
};