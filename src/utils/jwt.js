const jwt = require("jsonwebtoken");

const accessSecret = () => process.env.JWT_SECRET || "skillswapsecret";
const refreshSecret = () => process.env.JWT_REFRESH_SECRET || "skillswaprefreshsecret";

const generateToken = (id) =>
  jwt.sign({ id }, accessSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || "15m" });

const generateRefreshToken = (id) =>
  jwt.sign({ id }, refreshSecret(), { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" });

const verifyToken = (token) => jwt.verify(token, accessSecret());

const verifyRefreshToken = (token) => jwt.verify(token, refreshSecret());

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
