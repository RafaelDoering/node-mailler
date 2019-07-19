const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

const port = 3000;
const credentials = {
  from: {
    email: 'sender@example.com',
    password: 'mysuperstrongemailpassword'
  },
  to: {
    email: 'receiver@example.com'
  }
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: credentials.from.email,
      pass: credentials.from.password
    }
  });

  transporter.sendMail(
    {
      from: credentials.from.email,
      to: credentials.to.email,
      subject: req.body.subject,
      text: req.body.message,
      html: `<p>${req.body.message}</p>`
    },
    (err, info) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json('Success');
      }
    }
  );
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));