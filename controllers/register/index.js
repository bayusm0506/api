const bcrypt = require("bcrypt");
const status = require("../../helpers/status");
const CONST = require("../../config/const");
const catchAsync = require("../../utils/CatchAsync");

// Generate Token
const generateAccessToken = require("../../middlewares/generateAccessToken");

// Service
const service = require("./service");

const controller = {};

controller.register = catchAsync(async (req, res) => {
  let data = req.body;
  data.created_at = CONST.CURRENT_DATE;
  data.updated_at = CONST.CURRENT_DATE;

  data.password = bcrypt.hashSync(data.password, 10);

  // create a token
  data.token = generateAccessToken({
    username: data.username
  });

  // Execute Login
  let result = await service.register(data);

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

controller.login = catchAsync(async (req, res) => {
  let data = req.body;
  data.last_login = CONST.CURRENT_DATE;

  // Check Access Granted
  let checkAccess = await service.checkAccess(data);

  if (checkAccess.length == 0) {
    res
      .status(status.code.bad)
      .json(
        status.response_error(
          status.description.CANNOT_ACCESS
        )
      );
  } else {
    let user_detail = await service.userDetail(data);

    // If Data has been found
    if (user_detail.code === "01") {
      // Check passwords match
      if (bcrypt.compareSync(data.password, user_detail.data.password)) {
        // Passwords match
        // if user is found and password is valid
        // create a token
        let token = generateAccessToken({
          username: user_detail.data.username,
        });

        user_detail.data.auth = true;
        user_detail.data.token = token;
        user_detail.data.expiresIn = CONST.EXPIREDIN;

        await service.updateToken(user_detail, data); // Update token & last login

        res
          .status(status.code.success)
          .json(
            status.response_success(
              status.description.PASSWORD_MATCH,
              user_detail.data
            )
          );
      } else {
        // Passwords don't match
        res
          .status(status.code.bad)
          .json(
            status.response_error(
              status.description.PASSWORD_DO_NOT_MATCH
            )
          );
      }
    } else {
      res
        .status(status.code.notfound)
        .json(
          status.response_notfound(status.description.DATA_NOT_FOUND)
        );
    }
  }
});

controller.users = catchAsync(async (req, res) => {
  let result = await service.getUsers();
  if (result.code === "01") {
    res
      .status(status.code.success)
      .json(
        status.response_success(
          status.description.VIEW,
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

controller.refreshToken = catchAsync(async (req, res) => {
  let data = req.body;
  data.last_login = CONST.CURRENT_DATE;

  // Check Access Granted
  let checkAccess = await service.checkAccess(data);

  if (checkAccess.length == 0) {
    res
      .status(status.code.bad)
      .json(
        status.response_error(
          status.description.CANNOT_ACCESS
        )
      );
  } else {
    let user_detail = await service.userDetail(data);

    let token = generateAccessToken({
      username: user_detail.data.username,
    });

    user_detail.data.auth = true;
    user_detail.data.token = token;
    user_detail.data.expiresIn = CONST.EXPIREDIN;

    await service.updateToken(user_detail, data); // Update token & last login

    res
      .status(status.code.success)
      .json(
        status.response_success(
          status.description.REFRESH_TOKEN_SUCCESS,
          user_detail.data
        )
      );
  }
});

module.exports = controller;