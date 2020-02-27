const express = require("express");
const controller = express.Router();
const Mail = require("./models/mail");
const ErrorHandler = require("./models/error");
const { check, validationResult } = require("express-validator");

controller.post(
  "/form/sendmail",
  [
    // Validate values from the request body
    check("email").isEmail(),
    check("phone").isLength({ min: 10, max: 15 }),
    check("text")
      .trim()
      .escape()
  ],
  async (req, res) => {
    // Return HTTP status 400 if email or phone do not meet the validation requirements
    const errors = validationResult(req);
    if ("email" in errors.mapped() || "phone" in errors.mapped()) {
      throw new ErrorHandler(400, { errors: errors.array() });
    }

    try {
      // Get email, phone and text values from the request body
      const { email, phone, text } = req.body;

      // Get mailTo and mailSubject from the environmental variables
      const mailTo = process.env.MAIL_TO;
      const mailSubject = process.env.MAIL_SUBJECT;

      // Create a new Mail object
      const mail = new Mail(email, phone, text, mailTo, mailSubject);

      // Send the mail using the object's sendEmail method and return the response
      const response = await mail.sendEmail();
      res.json(response);
    } catch (err) {
      // Return HTTP status 500 if something goes unexpectedly wrong
      throw new ErrorHandler(500, err);
    }
  }
);

module.exports = controller;
