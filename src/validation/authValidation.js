const Joi = require("joi");

const roles = ["Founder", "Freelancer", "Investor", "Admin"];

const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(80).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid(...roles).default("Freelancer"),
  skills: Joi.array().items(Joi.string().trim().min(1).max(60)).default([]),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
