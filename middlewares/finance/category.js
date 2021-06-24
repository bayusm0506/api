const Ajv = require("ajv");
const status = require("../../helpers/status");

const validator = {};

validator.checkKategory = async (req, res, next) => {
    let data = req.body;
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
