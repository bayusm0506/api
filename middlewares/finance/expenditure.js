const Ajv = require("ajv");

const validator = {};

validator.checkExpenditure = async (data) => {
    var ajv = new Ajv({ allErrors: true, async: true });
    var schema = {
        type: "object",
        properties: {
            transaction_date: { type: "string", minLength: 1 },
            amount: { type: "string", minLength: 1 },
            detail: { type: "string", minLength: 1 },
            category_id: { type: "string", minLength: 1 },
            user_id: { type: "string", minLength: 1 },
            created_by: { type: "string", minLength: 1 },
        },
        required: ["transaction_date", "amount", "detail", "category_id", "user_id", "created_by"],
    };

    const validate = ajv.compile(schema);
    const valid = validate(data);

    return (data = {
        validate: validate,
        valid: valid,
    });
};

module.exports = validator;
