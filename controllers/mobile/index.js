const status = require("../../helpers/status");

const controller = {};

controller.index = async (req, res, next) => {
  res
    .status(status.code.success)
    .json(
      status.response(
        status.code.success,
        status.message.success,
        status.description.DASHBOARD
      )
    );
};

module.exports = controller;
