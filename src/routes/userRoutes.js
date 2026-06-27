const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  updateUserProfile,
  getUsers,
  getUserById,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getUsers);
router.get("/profile", protect, getCurrentUser);
router.put("/profile", protect, updateUserProfile);
router.get("/:id", protect, getUserById);

module.exports = router;
