const service = {};

const model = require("../../models");
const status = require("../../helpers/status");

service.register = async (data) => {
  try {
    // Create Data Register
    await model.Users.create(data);

    let result = await model.Users.findOne({
      raw: true,
      where: { username: data.username, email: data.email },
    });

    response = {
      code: "01",
      description: status.description.CREATE,
      data: result,
    };
  } catch (error) {
    // Error
    response = {
      code: "02",
      description: JSON.stringify(error.parent.detail),
    };
  }

  return response;
};

service.userDetail = async (data) => {
  try {
    // Create Data Register
    let result = await model.Users.findOne({
      raw: true,
      where: { username: data.username },
    });

    if (result) {
      response = {
        code: "01",
        data: result,
      };
    } else {
      response = {
        code: "02",
        data: {},
      };
    }
  } catch (error) {
    response = {
      code: "02",
      data: {},
    };
  }

  return response;
};

service.getUsers = async (data) => {
  try {
    // get all data user
    let result = await model.Users.findAll({
      raw: true,
    });
    response = {
      code: "01",
      data: result,
    };
  } catch (error) {
    response = {
      code: "02",
      data: [],
    };
  }

  return response;
};

service.updateToken = async (user_detail, data) => {
  return await model.Users.update(
    { last_login: data.last_login, token: user_detail.data.token },
    {
      where: {
        username: user_detail.data.username,
        email: user_detail.data.email,
      },
    }
  );
};

module.exports = service;
