const service = {};

const model = require("../../models");
const status = require("../../helpers/status");

const { Op } = require("sequelize");

// Operator Alias
// require("../../config/operator");

service.register = async (data) => {
  try {
    // Create Data Register
    await model.Users.create(data);

    let result = await model.Users.findOne({
      raw: true,
      attributes: {
        exclude: [
          "id_user",
          "password",
          "created_at",
          "updated_at",
          "last_login",
        ],
      },
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
      description: { error: error.parent.detail.toString() },
    };
  }

  return response;
};

service.userDetail = async (data) => {
  try {
    // Create Data Register
    let result = await model.Users.findOne({
      raw: true,
      attributes: { exclude: ["created_at", "updated_at", "last_login"] },
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
        data: result,
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

service.checkAccess = async (data) => {
  return await model.Roles.findAll({
    raw: true,
    nest: true,
    include: [
      {
        model: model.Users,
        where: {
          [Op.and]: [
            {
              username: data.username,
            },
          ],
        },
      },
    ],
  });
};

service.getUsers = async () => {
  let response;

  try {
    // get all data user
    let result = await model.Users.findAll({
      raw: true,
      attributes: {
        exclude: ["password", "created_at", "updated_at", "last_login"],
      },
    });

    response = {
      code: "01",
      data: result,
    };
  } catch (error) {
    response = {
      code: "02",
      description: { error: error.toString() },
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

service.updatePassword = async (id, data) => {
  let response;

  try {
    let checkUser = await model.Users.findOne({ // Check User Exist
      raw: true,
      where: {
        id_user: id
      }
    });

    if (checkUser) {
      await model.Users.update(data, {
        where: {
          id_user: id
        },
      }).then((result) => {
        response = {
          code: "01",
          data: data,
        };
      }).catch((error) => {
        response = {
          code: "02",
          description: { error: error.toString() },
        };
      })
    } else {
      response = {
        code: "02",
        description: status.description.DATA_NOT_FOUND,
      };
    }
  } catch (error) {
    // Catch Error
    response = {
      code: "02",
      description: { error: error.toString() },
    };
  }

  return response;
};

module.exports = service;
