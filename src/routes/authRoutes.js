const express = require("express");

const {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessToken,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validator");
const { registerSchema, loginSchema } = require("../validation/authValidation");
const { authLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema), registerUser);
router.post("/login", authLimiter, validate(loginSchema), loginUser);
router.post("/refresh", authLimiter, refreshAccessToken);
router.get("/me", protect, getCurrentUser);

module.exports = router;
