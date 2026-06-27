const askGrok=require("./grokService");

const summarizeMeeting=async(transcript)=>{

return await askGrok(`

Summarize this meeting.

${transcript}

Include

Summary

Tasks

Deadlines

Action Items

`);

};

module.exports={summarizeMeeting};