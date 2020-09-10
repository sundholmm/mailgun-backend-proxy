# mailgun-backend-proxy

A general purpose emailing application with schema validation. Gets values from an ENV file.
Works with mailgun-js (Mailgun: Transactional Email API Service)

Pull requests welcome!

### Installation and usage
```
$ git clone https://github.com/sundholmm/mailgun-backend-proxy
$ cd mailgun-backend-proxy
$ npm install
$ nano .env
$ node app.js
```

### Required ENV values:

```
PORT,
MAIL_API_KEY,
MAIL_DOMAIN,
MAIL_HOST,
MAIL_TO,
MAIL_SUBJECT
```

### Where the keys mean the followings
```
PORT: The port where the application is supposed to listen on
MAIL_API_KEY: The API key given by mailgun to access their API
MAIL_DOMAIN: The domain you have configured for mailgun, for example mg.mydomain.com
MAIL_HOST: Mailgun host, for example api.eu.mailgun.net
MAIL_TO: The recipient address of the email
MAIL_SUBJECT: The subject of the mail
```

#### [Help for setting MAIL_DOMAIN](https://help.mailgun.com/hc/en-us/articles/202256730-How-Do-I-Pick-a-Domain-Name-for-My-Mailgun-Account-)

Works with the following JSON input with HTTP POST to /api/v1/sendmail:

```
{
   "email":"example@mail.com",
   "phone":"0123456789",
   "text":"I am an example text for the mail"
}
```
