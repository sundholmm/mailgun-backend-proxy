const Ajv = require("ajv");
const ajv = Ajv({ allErrors: true, removeAdditional: "all" });
const userSchema = require("../schemas/mail.json");
const { ErrorHandler } = require("../models/error");
ajv.addSchema(userSchema, "new-mail");

/**
 * Validates incoming request bodies against the given schema,
 * providing an error response when validation fails
 * @param  {String} schemaName - name of the schema to validate
 * @return {Object} response
 */
const validateSchema = schemaName => {
  return (req, res, next) => {
    const valid = ajv.validate(schemaName, req.body);
    if (!valid) {
      return new ErrorHandler(400, { errors: ajv.errors });
    }
    next();
  };
};

module.exports = { validateSchema };
