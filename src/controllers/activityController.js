const Activity = require("../models/Activity");

const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create({
      user: req.user._id,
      project: req.body.project,
      startup: req.body.startup,
      action: req.body.action,
      description: req.body.description,
      metadata: req.body.metadata || {},
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name email")
      .populate("project", "title")
      .populate("startup", "startupName")
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createActivity,
  getActivities,
};