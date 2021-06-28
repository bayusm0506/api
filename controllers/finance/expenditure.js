const status = require("../../helpers/status");
const catchAsync = require("../../utils/CatchAsync");

// Service
const service = require("./service");
const CONST = require("../../config/const");

const controller = {};

controller.getExpenditure = catchAsync(async (req, res) => {
    let data = req.query;

    // Get Data
    let result = await service.getExpenditure(data);

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

controller.getAutoCompleteKetExpenditure = catchAsync(async (req, res) => {
    let data = req.query;

    // Get Data
    let result = await service.getAutoCompleteKetExpenditure(data);

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

controller.postExpenditure = catchAsync(async (req, res) => {
    let data = req.body;

    data.amount = parseInt(data.amount);
    data.category_id = parseInt(data.category_id);
    data.user_id = parseInt(data.user_id);
    data.created_at = CONST.CURRENT_DATE;

    // Execute
    let result = await service.postExpenditure(data);

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

controller.putExpenditure = catchAsync(async (req, res) => {
    let id_expenditure = req.params.id;
    let data = req.body;

    data.updated_at = CONST.CURRENT_DATE;

    // Execute
    let result = await service.putExpenditure(id_expenditure, data);

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

controller.delExpenditure = catchAsync(async (req, res) => {
    let id_category = req.params.id;
    // // Validate Expenditure
    // Execute
    let result = await service.delExpenditure(id_category);

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