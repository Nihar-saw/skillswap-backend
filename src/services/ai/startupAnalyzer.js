const askGrok = require("./grokService");

const fallbackAnalysis = (idea) => ({
  marketAnalysis: `Market analysis pending for: ${idea}`,
  competitors: "Competitor analysis pending",
  revenueModel: "Revenue model analysis pending",
  risks: "Risk analysis pending",
  roadmap: "Roadmap generation pending",
  successScore: 50,
});

const parseJson = (text, idea) => {
  try {
    const jsonText = text.replace(/```json|```/g, "").trim();
    return { ...fallbackAnalysis(idea), ...JSON.parse(jsonText) };
  } catch (error) {
    return {
      ...fallbackAnalysis(idea),
      marketAnalysis: text,
    };
  }
};

const analyzeStartup = async (idea) => {
  const prompt = `
Analyze this startup idea and return strict JSON with these fields:
marketAnalysis, competitors, revenueModel, risks, roadmap, successScore.

Idea:
${idea}
`;

  try {
    const response = await askGrok(prompt);
    return parseJson(response, idea);
  } catch (error) {
    return fallbackAnalysis(idea);
  }
};

module.exports = {
  analyzeStartup,
};
