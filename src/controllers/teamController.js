const Team = require("../models/Team");

const joinTeam = async (
  req,
  res
) => {

  const team = await Team.findById(
    req.params.teamId
  );

  team.members.push({
    user: req.user._id,
    role: req.body.role
  });

  await team.save();

  res.json(team);
};

module.exports = {
  joinTeam
};