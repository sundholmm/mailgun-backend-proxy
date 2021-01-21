// Get the env values
require("dotenv").config();

// Setup mailgun client from the env values
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAIL_API_KEY,
  domain: process.env.MAIL_DOMAIN,
  host: process.env.MAIL_HOST,
});

// Mail class provides the email sending features
class Mail {
  constructor(email, phone, text, mailTo, mailSubject) {
    this.mailFrom = email;
    this.phone = phone;
    this.text = text;
    this.mailTo = mailTo;
    this.mailSubject = mailSubject;
  }

  // sendEmail method sends the JSON formatted data to mailgun API
  sendEmail = () => {
    return new Promise((resolve, reject) => {
      // Set the data to be sent as email
      const mailData = {
        from: this.mailFrom,
        to: this.mailTo,
        subject: this.mailSubject,
        html:
          `<h2>${this.mailSubject}</h2>` +
          `<h3>Email: </h3><a href="mailto:${this.mailFrom}">${this.mailFrom}</a>` +
          `<h3>Phone: </h3><a href="tel:${this.phone}">${this.phone}</a>` +
          `<h3>Message: </h3><p>${this.text}</p>`,
      };

      // Send the email and check for errors
      mailgun.messages().send(mailData, (error, body) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(body);
          resolve(body);
        }
      });
    });
  };
}

module.exports = Mail;
