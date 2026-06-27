const askGrok=require("./grokService");

const reviewCode=async(code)=>{

return await askGrok(`

Review this code.

${code}

Provide

Security

Performance

Best Practices

Architecture

`);

};

module.exports={reviewCode};