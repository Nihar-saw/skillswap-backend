const Team = require("../models/Team");

const joinTeam = async (req, res) => {
  const team = await Team.findById(req.params.teamId);

  team.members.push({
    user: req.user._id,
    role: req.body.role,
  });

  await team.save();

  res.json(team);
};

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("members.user", "name email trustScore")
      .populate("startup", "startupName stage")
      .sort({ updatedAt: -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { joinTeam, getTeams };