const Ajv = require("ajv");

const validator = {};

validator.checkExpenditure = async (req, res, next) => {
    let data = req.body;
    var ajv = new Ajv({ allErrors: true, async: true });
    var schema = {
        type: "object",
        properties: {
            transaction_date: { type: "string", minLength: 1 },
            amount: { type: "string", minLength: 1 },
            detail: { type: "string", minLength: 1 },
            category_id: { type: "string", minLength: 1 },
            user_id: { type: "string", minLength: 1 },
        },
        required: ["transaction_date", "amount", "detail", "category_id", "user_id"],
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
