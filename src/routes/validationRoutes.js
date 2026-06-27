const express = require("express");
const { validate } = require("../middleware/validator");
const { registerSchema, loginSchema } = require("../validation/authValidation");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
