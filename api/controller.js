const express = require("express");
const controller = express.Router();
const Mail = require("./models/mail");

controller.post("/form/sendmail", async (req, res) => {
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
    res.json(err);
  }
});

module.exports = controller;
