const service = {};

const model = require("../../models");
const status = require("../../helpers/status");

service.register = async (data) => {
  try {
    // Create Data Register
    await model.Users.create(data);

    let result = await model.Users.findOne({
      where: { username: data.username, email: data.email },
    });

    data.id_user = result.dataValues.id_user;

    response = {
      code: "01",
      description: status.description.CREATE,
      data: data,
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

    response = {
      code: "01",
      data: result,
    };
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

module.exports = service;
