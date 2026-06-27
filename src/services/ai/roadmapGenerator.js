const askGrok = require("./grokService");

const generateRoadmap = async (idea) => {
    const prompt = `
You are an expert software architect.

Create a detailed roadmap for this startup/project:

${idea}

Return:

Week 1
Week 2
Week 3
Week 4

Required Technologies

Milestones

Final Deliverables
`;

    return await askGrok(prompt);
};

module.exports = generateRoadmap;