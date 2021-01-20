# mailgun-backend-proxy

A general purpose emailing application with schema validation. Gets values from an ENV file.
Works with mailgun-js (Transactional Email API Service).

The application works, for example, perfectly for proxying HTML form submits to Mailgun.

## Installation and usage

```
$ git clone https://github.com/sundholmm/mailgun-backend-proxy
$ cd mailgun-backend-proxy
$ npm install
$ nano .env // Add the env values documented below
$ node app.js
```

## Required ENV values and their descriptions

```
PORT // The port where the application is supposed to listen on
MAIL_API_KEY // The API key given by mailgun to access their API
MAIL_DOMAIN // The domain you have configured for mailgun, for example mg.mydomain.com
MAIL_HOST // Mailgun host, for example api.eu.mailgun.net
MAIL_TO // The recipient address of the email
MAIL_SUBJECT // The subject of the mail
```

## API

Works with the following HTTP POST request to /api/v1/sendmail:

```
{
   "email":"example@mail.com",
   "phone":"0123456789",
   "text":"I am an example text for the mail"
}
```

## Support

Please refer to the official [Mailgun documentation](https://documentation.mailgun.com/en/latest/) when setting up the Mailgun account
