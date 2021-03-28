const bcrypt = require("bcrypt");
const status = require("../../helpers/status");
const CONST = require("../../config/const");

// Validate
const validate = require("../../middlewares/validate");
const helpers = require("../../helpers");
const generateAccessToken = require("../../middlewares/generateAccessToken");

// Service
const service = require("./service");

const controller = {};

controller.index = async (req, res) => {
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

controller.register = async (req, res) => {
  let data = req.body;
  data.created_at = CONST.CURRENT_DATE;
  data.updated_at = CONST.CURRENT_DATE;

  // Validate Login
  let cek = await validate.register.checkRegister(data);

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
    data.password = bcrypt.hashSync(data.password, 10);

    // create a token
    data.token = generateAccessToken({ username: data.username });

    // Execute Login
    let result = await service.register(data);

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
};

controller.login = async (req, res) => {
  let data = req.body;
  data.last_login = CONST.CURRENT_DATE;
  let user_detail = await service.userDetail(data);

  if (user_detail.code === "01") {
    if (bcrypt.compareSync(data.password, user_detail.data.password)) {
      // Passwords match
      // if user is found and password is valid
      // create a token
      let token = generateAccessToken({ username: user_detail.data.username });

      user_detail.data.auth = true;
      user_detail.data.token = token;

      await service.updateToken(user_detail, data); // Update token & last login

      res
        .status(status.code.success)
        .json(
          status.response(
            status.code_response.success,
            status.message.success,
            "Passwords match",
            user_detail.data
          )
        );
    } else {
      // Passwords don't match
      res
        .status(status.code.bad)
        .json(
          status.response(
            status.code_response.error,
            status.message.error,
            "Passwords don't match"
          )
        );
    }
  } else {
    res
      .status(status.code.notfound)
      .json(
        status.response(
          status.code_response.error,
          status.message.not_found,
          status.description.DATA_NOT_FOUND
        )
      );
  }
};

controller.users = async (req, res) => {
  let result = await service.getUsers();
  res
    .status(status.code.success)
    .json(
      status.response(
        status.code_response.success,
        status.message.success,
        status.description.VIEW,
        result.data
      )
    );
};

module.exports = controller;
