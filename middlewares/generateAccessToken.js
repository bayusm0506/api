const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: 86400 });
};

module.exports = generateAccessToken;
