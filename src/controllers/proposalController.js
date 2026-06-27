const Proposal = require("../models/Proposal");

const createProposal = async (req, res) => {
  try {

    const proposal = await Proposal.create({
      project: req.body.projectId,
      freelancer: req.user._id,
      coverLetter: req.body.coverLetter,
      bidAmount: req.body.bidAmount
    });

    res.status(201).json(proposal);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getProjectProposals = async (
  req,
  res
) => {

  const proposals = await Proposal.find({
    project: req.params.projectId
  })
    .populate("freelancer", "name email");

  res.json(proposals);
};

module.exports = {
  createProposal,
  getProjectProposals
};