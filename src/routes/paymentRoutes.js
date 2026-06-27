const express = require("express");
const router = express.Router();
const {
  getWalletDetails,
  getTransactionHistory,
  transferWalletPoints,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.get("/wallet", protect, getWalletDetails);
router.get("/transactions", protect, getTransactionHistory);
router.post("/transfer", protect, transferWalletPoints);

module.exports = router;
