const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', cors((req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_EMAIL_PASSWORD
    }
  });

  const name = req.query.name;
  const subject = req.query.subject;
  const message = req.query.message;

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: req.query.email,
    subject: `${name} - ${subject}`,
    html: `<p>${message}</p>`
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.json(err);
    }
    return res.json('Success');
  });
}));

app.listen(port, () => console.log(`Server listening on port ${port}!`));
