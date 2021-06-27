const status = require("../../helpers/status");
const catchAsync = require("../../utils/CatchAsync");

// Service
const service = require("./service");

const controller = {};

controller.getRekapitulasi = catchAsync(async (req, res) => {
    let data = req.query;

    // Get Data
    let result = await service.getRekapitulasi(data);

    if (result.code === "01") {
        res
            .status(status.code.success)
            .json(
                status.response_success(
                    result.description,
                    result.data
                )
            );
    } else {
        res
            .status(status.code.bad)
            .json(
                status.response_error(
                    result.description
                )
            );
    }
});

module.exports = controller;