const Ajv = require("ajv");

const validator = {};

validator.checkKategory = async (data) => {
    var ajv = new Ajv({ allErrors: true, async: true });
    var schema = {
        type: "object",
        properties: {
            name: { type: "string", minLength: 1 },
        },
        required: ["name"],
    };

    const validate = ajv.compile(schema);
    const valid = validate(data);

    return (data = {
        validate: validate,
        valid: valid,
    });
};

module.exports = validator;
