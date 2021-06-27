const register = require("./register");
const mobile = require("./mobile");

// Finance
const category = require("./finance/category");
const expenditure = require("./finance/expenditure");
const income = require("./finance/income");
const rekapitulasi = require("./finance/rekapitulasi");

module.exports = {
  register: register,
  mobile: mobile,
  category: category,
  expenditure: expenditure,
  income: income,
  rekapitulasi: rekapitulasi,
};