const Moment = require("moment");

const CONST = {};

CONST.CURRENT_DATE = Moment().format("YYYY-MM-DD HH:mm:ss");
CONST.SALT = 2021;

module.exports = CONST;
