const express =
require("express");

const router =
express.Router();

const {
startupValidation,
projectAnalysis,
roadmap
} = require(
"../controllers/aiController"
);

router.post(
"/startup-validator",
startupValidation
);

router.post(
"/project-analyzer",
projectAnalysis
);

router.post(
"/roadmap",
roadmap
);

module.exports =
router;