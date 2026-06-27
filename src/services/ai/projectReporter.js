const askGrok = require("./grokService");

const generateReport = async(project)=>{

return await askGrok(`

Generate a weekly project report.

${JSON.stringify(project)}

Include

Summary

Completed

Pending

Risks

Next Sprint

`);

};

module.exports={generateReport};