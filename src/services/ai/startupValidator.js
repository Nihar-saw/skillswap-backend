const askGrok = require("./grokService");

const validateStartup = async (
  startupIdea
) => {

  const prompt = `
  Analyze this startup idea.

  Startup Idea:
  ${startupIdea}

  Return:
  1. Market Potential
  2. Competitors
  3. Risks
  4. Revenue Model
  5. Suggestions
  `;

  return await askGrok(prompt);
};

module.exports = validateStartup;