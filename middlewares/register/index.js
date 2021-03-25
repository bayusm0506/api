const Ajv = require("ajv");

const validator = {};

validator.checkRegister = async (data) => {
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

  return (data = {
    validate: validate,
    valid: valid,
  });
};

module.exports = validator;
