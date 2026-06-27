const Startup = require("../models/Startup");

const createStartup = async (req, res) => {
  try {
    const startup = await Startup.create({
      startupName: req.body.startupName,
      idea: req.body.idea,
      requiredSkills: req.body.requiredSkills,
      founder: req.user._id,
    });

    res.status(201).json(startup);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStartups = async (req, res) => {
  try {
    const startups = await Startup.find()
      .populate("founder", "name email");

    res.json(startups);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createStartup,
  getStartups,
};