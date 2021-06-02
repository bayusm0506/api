const register = require("./register");
const category = require("./finance/category");
const expenditure = require("./finance/expenditure");
const income = require("./finance/income");

module.exports = {
  register: register,
  category: category,
  expenditure: expenditure,
  income: income,
};
