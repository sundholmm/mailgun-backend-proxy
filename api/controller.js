const express = require("express");
const controller = express.Router();
const Mail = require("./models/mail");
const { ErrorHandler } = require("./models/error");
const { validateSchema } = require("./utils/helpers");
const { check, validationResult } = require("express-validator");

// Setup the controller HTTP POST path /sendmail
controller.post(
  "/sendmail",
  [
    // Validate the content type
    check("content-type").equals("application/json"),
    // Validate the incoming request body against new-mail schema using ajv
    validateSchema("new-mail"),
    // Go through rest of the express-validator checks
    check("email").isEmail(),
    check("phone")
      .isLength({ min: 5, max: 20 })
      .optional({ checkFalsy: true }),
    check("text").trim().escape().optional({ checkFalsy: true }),
  ],
  async (req, res, next) => {
    // Return HTTP status 422 if there are errors within the value validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new ErrorHandler(422, { errors: errors.array() }));
      return;
    }

    try {
      // Get email, phone and text values from the request body
      const { email, phone, text } = req.body;

      // Get mailTo and mailSubject from the environmental variables
      const mailTo = process.env.MAIL_TO;
      const mailSubject = process.env.MAIL_SUBJECT;

      // Create a new Mail object
      const mail = new Mail(email, phone, text, mailTo, mailSubject);

      // Send the mail using the Mail class method sendEmail() and return the response
      const response = await mail.sendEmail();
      res.json(response);
    } catch (err) {
      // Return HTTP status 500 if something goes unexpectedly wrong
      next(new ErrorHandler(500, err));
      return;
    }
  }
);

// Setup the controller HTTP GET path /health for AWS LB health checks
controller.get("/health", async (req, res, next) => {
  res.json({ status: "ok" });
});

// Catch requests resulting to 404 and forward them to error handler
controller.use(function (req, res, next) {
  next(new ErrorHandler(404, "Not Found"));
});

module.exports = controller;
