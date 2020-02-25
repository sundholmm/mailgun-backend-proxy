const express = require("express");
const controller = express.Router();
const Mail = require("./services/mailService");

controller.post("/form/sendmail", async (req, res) => {
  try {
    const { email, phone, text } = req.body;
    const mail = new Mail(email, phone, text);
    const response = await mail.sendEmail();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

module.exports = controller;
