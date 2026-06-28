const Project = require("../models/Project");
const Notification = require("../models/Notification");
const Activity = require("../models/Activity");
const SkillWallet = require("../models/SkillWallet");
const User = require("../models/User");
const MeetingRoom = require("../models/MeetingRoom");
const File = require("../models/File");
const Startup = require("../models/Startup");
const Team = require("../models/Team");
const Payment = require("../models/Payment");
const DeadlinePrediction = require("../models/DeadlinePrediction");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const [
      projects,
      notifications,
      activities,
      wallet,
      leaderboard,
      meetings,
      files,
      startups,
      teams,
      projectCount,
      unreadCount,
      recentTransactions,
      deadlines,
    ] = await Promise.all([
      Project.find({ owner: userId }).sort({ updatedAt: -1 }).limit(6).populate("owner", "name"),
      Notification.find({ receiver: userId })
        .sort({ createdAt: -1 })
        .limit(8)
        .populate("sender", "name"),
      Activity.find()
        .sort({ createdAt: -1 })
        .limit(8)
        .populate("user", "name email")
        .populate("project", "title"),
      SkillWallet.findOne({ user: userId }),
      User.find().select("-password").sort({ trustScore: -1 }).limit(10),
      MeetingRoom.find({
        $or: [{ host: userId }, { "participants.user": userId }],
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("host", "name"),
      File.find({ uploadedBy: userId }).sort({ createdAt: -1 }).limit(6).populate("uploadedBy", "name"),
      Startup.find().sort({ createdAt: -1 }).limit(6).populate("founder", "name"),
      Team.find().populate("members.user", "name email").populate("startup", "startupName").limit(6),
      Project.countDocuments({ owner: userId }),
      Notification.countDocuments({ receiver: userId, isRead: false }),
      Payment.find({ $or: [{ sender: userId }, { receiver: userId }] })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("sender", "name")
        .populate("receiver", "name"),
      DeadlinePrediction.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.json({
      success: true,
      stats: {
        activeProjects: projectCount,
        escrowBalance: wallet?.balance ?? 0,
        unreadNotifications: unreadCount,
        trustScore: req.user.trustScore ?? 0,
      },
      projects,
      notifications,
      activities,
      wallet,
      leaderboard,
      meetings,
      files,
      startups,
      teams,
      recentTransactions,
      deadlines,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboard };
