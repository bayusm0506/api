const Moment = require("moment");

const CONST = {};

CONST.CURRENT_DATE = Moment().format("YYYY-MM-DD HH:mm:ss");
CONST.SALT = 2021;
CONST.EXPIREDIN = 86400;

module.exports = CONST;
