const Ajv = require("ajv").default;
const userSchema = require("../schemas/mail.json");
const { ErrorHandler } = require("../models/error");

// Setup ajv
const ajv = new Ajv({ allErrors: true, removeAdditional: "all" });

// Add the new-mail schema to ajv
ajv.addSchema(userSchema, "new-mail");

// validateSchema validates incoming request bodies against the given schema
// providing an error response when validation fails
const validateSchema = (schemaName) => {
  return (req, res, next) => {
    const valid = ajv.validate(schemaName, req.body);
    if (!valid) {
      return new ErrorHandler(400, { errors: ajv.errors });
    }
    next();
  };
};

module.exports = { validateSchema };
