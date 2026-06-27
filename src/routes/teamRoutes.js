const express = require("express");

const router = express.Router();

const {
  joinTeam
} = require(
  "../controllers/teamController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/join/:teamId",
  protect,
  joinTeam
);

module.exports = router;