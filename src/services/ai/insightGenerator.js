const askGrok=require("./grokService");

const generateInsights=async(data)=>{

return await askGrok(`

Generate project insights.

${JSON.stringify(data)}

Return JSON

[
{

"title":"",

"description":"",

"priority":""

}

]

`);

};

module.exports={
generateInsights
};