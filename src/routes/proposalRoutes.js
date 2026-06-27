const express = require("express");

const router = express.Router();

const {
  createProposal,
  getProjectProposals
} = require(
  "../controllers/proposalController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

router.post("/", protect, createProposal);

router.get(
  "/project/:projectId",
  protect,
  getProjectProposals
);

module.exports = router;