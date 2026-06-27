const askGrok=require("./grokService");

const findBugs=async(code)=>{

return await askGrok(`

Find bugs.

${code}

Explain each issue.

`);

};

module.exports={findBugs};