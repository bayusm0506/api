const jwt = require("jsonwebtoken");

const generateAccessToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: 86400 });
};

module.exports = generateAccessToken;
