const Ajv = require("ajv");
const status = require("../../helpers/status");

const validator = {};

validator.checkRegister = async (req, res, next) => {
  let data = req.body;
  var ajv = new Ajv({ allErrors: true, async: true });
  var schema = {
    type: "object",
    properties: {
      username: { type: "string", minLength: 1 },
      password: { type: "string", minLength: 1 },
      email: { type: "string", minLength: 1 },
    },
    required: ["username", "password", "email"],
  };

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    res
      .status(status.code.bad)
      .json(
        status.response_validation(validate.errors)
      );
  } else {
    next();
  }
};

module.exports = validator;
