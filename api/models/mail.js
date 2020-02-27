require("dotenv").config();
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAIL_API_KEY,
  domain: process.env.MAIL_DOMAIN
});

class Mail {
  constructor(email, phone, text) {
    this.mailTo = process.env.MAIL_TO;
    this.mailSubject = process.env.MAIL_SUBJECT;
    this.mailFrom = email || process.env.MAIL_FROM_ALTERNATIVE;
    this.phone = phone || "";
    this.text = text || "";
  }

  sendEmail = () => {
    return new Promise((resolve, reject) => {
      const mailData = {
        from: this.mailFrom,
        to: this.mailTo,
        subject: this.mailSubject,
        text: `${this.text} ${this.phone}`
      };

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
