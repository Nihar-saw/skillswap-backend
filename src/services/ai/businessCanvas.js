const askGrok =
require("./grokService");

const generateCanvas =
async(idea)=>{

const prompt=`

Generate a Business Model Canvas.

Startup:

${idea}

Return

Customer Segments

Value Proposition

Channels

Revenue

Resources

Partners

Costs

`;

return await askGrok(prompt);

};

module.exports={
generateCanvas
};