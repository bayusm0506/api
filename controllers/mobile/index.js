const status = require("../../helpers/status");
const catchAsync = require("../../utils/CatchAsync");

const controller = {};

controller.index = catchAsync(async (req, res) => {
  res
    .status(status.code.success)
    .json(
      status.response(
        status.code.success,
        status.message.success,
        status.description.DASHBOARD
      )
    );
});

module.exports = controller;
