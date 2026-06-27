const askGrok = require("./grokService");

const getRecommendationScore = async (userProfile, projectDetails) => {
  const prompt = `
Evaluate the match between this freelancer's skills and the project requirements.

Freelancer:
Name: ${userProfile.name}
Role: ${userProfile.role}
Skills: ${userProfile.skills.join(", ")}
Trust Score: ${userProfile.trustScore}

Project:
Title: ${projectDetails.title}
Description: ${projectDetails.description}
Budget: ${projectDetails.budget}
Required Skills: ${projectDetails.skillsRequired.join(", ")}

Analyze the match and return a JSON object with this exact structure:
{
  "score": <number between 0 and 100>,
  "strengths": [<array of strings detailing matching skills>],
  "gaps": [<array of strings detailing missing skills or hurdles>],
  "reasoning": "<explanation>"
}

Return ONLY valid JSON. No markdown code blocks, backticks, or prefix text.
`;

  try {
    const responseText = await askGrok(prompt);
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI recommendation scoring failed, using heuristic fallback:", error);
    const userSkillsSet = new Set(userProfile.skills.map(s => s.toLowerCase().trim()));
    const matching = projectDetails.skillsRequired.filter(s => userSkillsSet.has(s.toLowerCase().trim()));
    const score = projectDetails.skillsRequired.length > 0 
      ? Math.round((matching.length / projectDetails.skillsRequired.length) * 100)
      : 50;
    return {
      score,
      strengths: matching.length > 0 ? [`Matches skills: ${matching.join(", ")}`] : [],
      gaps: projectDetails.skillsRequired.filter(s => !userSkillsSet.has(s.toLowerCase().trim())).map(s => `Missing ${s}`),
      reasoning: "Calculated via fallback algorithm due to service offline."
    };
  }
};

module.exports = getRecommendationScore;
