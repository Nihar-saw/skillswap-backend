const validateStartup =
require("../services/ai/startupValidator");

const analyzeProject =
require("../services/ai/projectAnalyzer");

const generateRoadmap =
require("../services/ai/roadmapGenerator");

const startupValidation =
async (req,res)=>{

const result =
await validateStartup(
req.body.idea
);

res.json({
result
});
};

const projectAnalysis =
async (req,res)=>{

const result =
await analyzeProject(
req.body.title,
req.body.description
);

res.json({
result
});
};

const roadmap =
async (req,res)=>{

const result =
await generateRoadmap(
req.body.idea
);

res.json({
result
});
};

module.exports = {
startupValidation,
projectAnalysis,
roadmap
};