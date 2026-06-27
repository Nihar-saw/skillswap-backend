const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
} = require("../controllers/projectController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createProject);

router.get("/", getProjects);

router.get("/:id", getProjectById);

module.exports = router;