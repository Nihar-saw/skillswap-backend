const User =
require("../../models/User");

const matchTeam =
async (skills) => {

  const users =
    await User.find({
      skills: {
        $in: skills
      }
    });

  return users;
};

module.exports =
matchTeam;