const status = require("../../helpers/status");
const catchAsync = require("../../utils/CatchAsync");

// Validate
const validate = require("../../middlewares/validate");

// Service
const service = require("./service");

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

controller.getKategori = catchAsync(async (req, res) => {
    let data = req.query;

    // Get Data
    let result = await service.getCategory(data);

    if (result.code === "01") {
        res
            .status(status.code.success)
            .json(
                status.response(
                    status.code_response.success,
                    status.message.success,
                    result.description,
                    result.data
                )
            );
    } else {
        res
            .status(status.code.bad)
            .json(
                status.response(
                    status.code_response.error,
                    status.message.error,
                    result.description
                )
            );
    }
});

controller.postKategori = catchAsync(async (req, res) => {
    let data = req.body;

    // Validate Kategori
    let cek = await validate.category.checkKategory(data);

    if (!cek.valid) {
        res
            .status(status.code.bad)
            .json(
                status.response(
                    status.code_response.error,
                    status.message.error,
                    status.description.VALIDATE,
                    cek.validate.errors
                )
            );
    } else {
        // Execute
        let result = await service.postCategory(data);

        if (result.code === "01") {
            res
                .status(status.code.success)
                .json(
                    status.response(
                        status.code_response.success,
                        status.message.success,
                        result.description,
                        result.data
                    )
                );
        } else {
            res
                .status(status.code.bad)
                .json(
                    status.response(
                        status.code_response.error,
                        status.message.error,
                        result.description
                    )
                );
        }
    }
});

controller.putKategori = catchAsync(async (req, res) => {
    let id_category = req.params.id;
    let data = req.body;
    // // Validate Kategori
    let cek = await validate.category.checkKategory(data);

    if (!cek.valid) {
        res
            .status(status.code.bad)
            .json(
                status.response(
                    status.code_response.error,
                    status.message.error,
                    status.description.VALIDATE,
                    cek.validate.errors
                )
            );
    } else {
        // Execute
        let result = await service.putCategory(id_category, data);

        if (result.code === "01") {
            res
                .status(status.code.success)
                .json(
                    status.response(
                        status.code_response.success,
                        status.message.success,
                        result.description,
                        result.data
                    )
                );
        } else {
            res
                .status(status.code.bad)
                .json(
                    status.response(
                        status.code_response.error,
                        status.message.error,
                        result.description
                    )
                );
        }
    }
});

controller.delKategori = catchAsync(async (req, res) => {
    let id_category = req.params.id;
    // // Validate Kategori
    // Execute
    let result = await service.delCategory(id_category);

    if (result.code === "01") {
        res
            .status(status.code.success)
            .json(
                status.response(
                    status.code_response.success,
                    status.message.success,
                    result.description,
                    result.data
                )
            );
    } else {
        res
            .status(status.code.bad)
            .json(
                status.response(
                    status.code_response.error,
                    status.message.error,
                    result.description
                )
            );
    }
});

module.exports = controller;