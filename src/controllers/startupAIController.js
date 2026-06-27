const StartupAnalysis =
require("../models/StartupAnalysis");

const {
analyzeStartup
}=require("../services/ai/startupAnalyzer");

const {
generatePitch
}=require("../services/ai/pitchGenerator");

const analyze =
async(req,res)=>{

const result=
await analyzeStartup(
req.body.idea
);

const pitch=
await generatePitch(
req.body.idea
);

const analysis=
await StartupAnalysis.create({

analyzedBy:req.user._id,

idea:req.body.idea,

marketAnalysis:result.marketAnalysis,

competitors:result.competitors,

revenueModel:result.revenueModel,

risks:result.risks,

roadmap:result.roadmap,

successScore:result.successScore,

investorPitch:pitch

});

res.json(analysis);

};

module.exports={
analyze
};