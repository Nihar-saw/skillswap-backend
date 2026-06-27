const Payment = require("../models/Payment");
const SkillWallet = require("../models/SkillWallet");
const paymentService = require("../services/payment/paymentService");

const getWalletDetails = async (req, res) => {
  try {
    let wallet = await SkillWallet.findOne({ user: req.user._id });
    if (!wallet) {
      wallet = await paymentService.initializeWallet(req.user._id);
    }
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Payment.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const transferWalletPoints = async (req, res) => {
  try {
    const { receiverId, amount, projectId } = req.body;

    if (!receiverId || !amount) {
      return res.status(400).json({ message: "Receiver ID and amount are required" });
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    const payment = await paymentService.transferPoints(
      req.user._id,
      receiverId,
      amountNum,
      projectId
    );

    res.json({
      success: true,
      message: "Transfer completed successfully",
      transaction: payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWalletDetails,
  getTransactionHistory,
  transferWalletPoints,
};
