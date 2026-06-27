const askGrok =
require("./grokService");

const marketResearch =
async(idea)=>{

return await askGrok(

`Provide detailed market research for:

${idea}

Include:

Target audience

Market size

Current trends

Growth opportunities

`

);

};

module.exports={
marketResearch
};