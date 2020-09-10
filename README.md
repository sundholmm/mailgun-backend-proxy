# mailgun-backend-proxy

A general purpose emailing application with schema validation. Gets values from an ENV file.
Works with mailgun-js (Mailgun: Transactional Email API Service)

Required ENV values:

```
MAIL_API_KEY,
MAIL_DOMAIN,
MAIL_HOST,
MAIL_TO,
MAIL_SUBJECT
```

Works with the following JSON input with HTTP POST to /api/v1/sendmail:

```
{
   "email":{
      "type":"string",
      "description":"email address of the mail object"
   },
   "phone":{
      "type":"string",
      "description":"phone number of the mail object"
   },
   "text":{
      "type":"string",
      "description":"text of the mail object"
   }
}
```
