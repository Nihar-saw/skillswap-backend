const askGrok = require("./grokService");
const User = require("../../models/User");

const buildTeam = async (startupIdea, requiredSkills) => {
  try {
    const potentialMembers = await User.find({ role: "Freelancer" }).limit(20).select("name email skills trustScore");
    
    const membersData = potentialMembers.map(u => ({
      id: u._id,
      name: u.name,
      skills: u.skills,
      trustScore: u.trustScore
    }));

    const prompt = `
Given the startup idea and required skills, review the available talents and propose the optimal team structure.

Startup Idea:
${startupIdea}

Ideal Required Skills:
${requiredSkills.join(", ")}

Available Talent Pool:
${JSON.stringify(membersData, null, 2)}

Return a JSON object containing:
{
  "recommendedRoles": [
    {
      "role": "<e.g., Lead Architect>",
      "responsibilities": "<responsibilities description>",
      "idealSkills": [<required skills>],
      "bestMatchUserId": "<id of matching user or null>",
      "matchReason": "<explanation>"
    }
  ],
  "strategicAdvice": "<advice on execution>"
}

Return ONLY valid JSON. No markdown code blocks, backticks, or prefix text.
`;

    const responseText = await askGrok(prompt);
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI team builder service failed, returning basic roles:", error);
    return {
      recommendedRoles: requiredSkills.map(skill => ({
        role: `${skill} Engineer`,
        responsibilities: `Handle development concerning ${skill}.`,
        idealSkills: [skill],
        bestMatchUserId: null,
        matchReason: "AI service offline. Matching manually."
      })),
      strategicAdvice: "Review candidate profiles manually to assemble the team."
    };
  }
};
const {
calculateSkillMatch
}=require("../../utils/skillSimilarity");

const matchUsers =
async(requiredSkills)=>{

const users=
await User.find();

const matches=[];

users.forEach(user=>{

const score=
calculateSkillMatch(

requiredSkills,

user.skills

);

matches.push({

user,

score

});

});

matches.sort(

(a,b)=>b.score-a.score

);

return matches.slice(0,10);

};
module.exports = buildTeam;
module.exports.matchUsers = matchUsers;