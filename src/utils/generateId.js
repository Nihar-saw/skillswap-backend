const crypto = require("crypto");

const generateId = (prefix = "") => {
  return `${prefix}${crypto.randomBytes(16).toString("hex")}`;
};

module.exports = generateId;
