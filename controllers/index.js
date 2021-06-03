const register = require("./register");
const mobile = require("./mobile");
const category = require("./finance/category");
const expenditure = require("./finance/expenditure");
module.exports = {
  register: register,
  mobile: mobile,
  category: category,
  expenditure: expenditure,
};