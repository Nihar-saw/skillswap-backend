const askGrok=require("./grokService");

const generateDocumentation=async(project)=>{

return await askGrok(`

Generate a professional README.

${project}

`);

};

module.exports={generateDocumentation};