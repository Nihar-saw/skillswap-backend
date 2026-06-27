const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { initializeWallet } = require("../services/payment/paymentService");
const { createNotification } = require("../services/notification/notificationService");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, skills } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      skills,
    });

    // Initialize Wallet
    await initializeWallet(user._id);

    // Welcome Notification
    try {
      await createNotification({
        receiver: user._id,
        title: "Welcome to SkillSwap!",
        message: `Hi ${user.name}, welcome to the platform! Your Skill Wallet has been credited with 100 points.`,
        type: "system"
      });
    } catch (notifErr) {
      console.error("Failed to send welcome notification:", notifErr);
    }

    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      skills: user.skills,
      trustScore: user.trustScore,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (
      user &&
      (await user.comparePassword(password))
    ) {
      return res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        trustScore: user.trustScore,
        token: generateToken(user._id),
      });
    }

    res.status(401).json({
      message: "Invalid Credentials",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
