// utils/hashUtils.js

const bcrypt = require('bcryptjs');

// Hash a password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Verify a password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, verifyPassword };
