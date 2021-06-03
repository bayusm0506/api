const jwt = require("jsonwebtoken");
const { EXPIREDIN } = require('../config/const')

const generateAccessToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: EXPIREDIN });
};

module.exports = generateAccessToken;
