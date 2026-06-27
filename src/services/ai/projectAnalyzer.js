const askGrok =
require("./grokService");

const analyzeProject =
async (
title,
description
) => {

const prompt = `
Project Title:
${title}

Description:
${description}

Analyze:

1. Cost Estimate
2. Team Size
3. Timeline
4. Required Skills
5. Difficulty Level
`;

return await askGrok(prompt);
};

module.exports =
analyzeProject;