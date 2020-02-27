const mailgun = require("mailgun-js")({
  apiKey: process.env.MAIL_API_KEY,
  domain: process.env.MAIL_DOMAIN
});

class Mail {
  constructor(email, phone, text, mailTo, mailSubject) {
    this.mailFrom = email;
    this.phone = phone;
    this.text = text;
    this.mailTo = mailTo;
    this.mailSubject = mailSubject;
  }

  sendEmail = () => {
    return new Promise((resolve, reject) => {
      // Set the data to be sent as email
      const mailData = {
        from: this.mailFrom,
        to: this.mailTo,
        subject: this.mailSubject,
        text: `${this.text} ${this.phone}`
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
