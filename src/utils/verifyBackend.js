require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const SkillWallet = require("../models/SkillWallet");
const Notification = require("../models/Notification");
const Payment = require("../models/Payment");
const { initializeWallet, transferPoints } = require("../services/payment/paymentService");
const { createNotification } = require("../services/notification/notificationService");
const getRecommendationScore = require("../services/ai/reccomendationScore");
const buildTeam = require("../services/ai/teamBuilder");
const updateTrustScore = require("../services/ai/trustScore");

const runVerify = async () => {
  console.log("Starting integration verification...");
  
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skillswap");
    console.log("✔ Connected to MongoDB successfully.");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }

  // Clear existing mock data if any from previous tests
  await User.deleteMany({ email: /mock_verify_/ });
  await SkillWallet.deleteMany({});
  await Notification.deleteMany({});
  await Payment.deleteMany({});

  try {
    // Test User creation & Wallet Initialization
    const founder = await User.create({
      name: "Mock Founder",
      email: "mock_verify_founder@test.com",
      password: "password123",
      role: "Founder",
      skills: ["Management", "Product Design"]
    });
    console.log("✔ Created Mock Founder.");

    const freelancer = await User.create({
      name: "Mock Freelancer",
      email: "mock_verify_free@test.com",
      password: "password123",
      role: "Freelancer",
      skills: ["React", "Node.js", "MongoDB"]
    });
    console.log("✔ Created Mock Freelancer.");

    const founderWallet = await initializeWallet(founder._id);
    const freelancerWallet = await initializeWallet(freelancer._id);
    console.log(`✔ Wallets initialized. Founder: ${founderWallet.points} points, Freelancer: ${freelancerWallet.points} points.`);

    // Test Transfer
    const transfer = await transferPoints(founder._id, freelancer._id, 20);
    const updatedFounderWallet = await SkillWallet.findOne({ user: founder._id });
    const updatedFreelancerWallet = await SkillWallet.findOne({ user: freelancer._id });
    console.log(`✔ Transferred 20 points. Founder: ${updatedFounderWallet.points} points, Freelancer: ${updatedFreelancerWallet.points} points.`);
    console.log(`✔ Transfer transaction logged: ${transfer.transactionType} of ${transfer.amount} points.`);

    // Test Notification
    const notif = await createNotification({
      receiver: freelancer._id,
      sender: founder._id,
      title: "New Collaboration",
      message: "Founder wants to swap skills with you!",
      type: "proposal"
    });
    console.log(`✔ Notification created and dispatched: "${notif.title}"`);

    // Test Trust Score
    const newTrustScore = await updateTrustScore(freelancer._id);
    console.log(`✔ Trust score calculated and updated: ${newTrustScore}`);

    // Test AI services (local mock or API call depending on API key)
    console.log("Running AI Recommendation Score test...");
    const mockProject = {
      title: "Build MERN Web App",
      description: "Looking for a fullstack developer to build a skillswap application in React and Express.",
      budget: 150,
      skillsRequired: ["React", "Node.js", "MongoDB"]
    };
    
    const recResult = await getRecommendationScore(freelancer, mockProject);
    console.log("✔ AI Recommendation Score result:", recResult);

    console.log("Running AI Team Builder test...");
    const teamResult = await buildTeam("AI Powered MERN study assistant", ["React", "Express", "Python"]);
    console.log("✔ AI Team Builder result:", teamResult);

    console.log("🎉 All integration verifications PASSED!");
  } catch (error) {
    console.error("❌ Verification failed with error:", error);
  } finally {
    // Clean up
    await User.deleteMany({ email: /mock_verify_/ });
    await SkillWallet.deleteMany({});
    await Notification.deleteMany({});
    await Payment.deleteMany({});
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
};

runVerify();
