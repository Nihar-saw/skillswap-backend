const express = require("express");

const router = express.Router();

const {
analyzeDeadline,
getPrediction
} = require("../controllers/deadlineController");

const {
protect
} = require("../middleware/authMiddleware");

router.post(
"/",
protect,
analyzeDeadline
);

router.get(
"/:projectId",
protect,
getPrediction
);

module.exports = router;