const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config()

const app = express();

const PORT = 3000;

app.use(cors({
    origin: process.env.CORS
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/', (req, res) => {
  const {name, subject, message, email} = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: `${name} - ${subject}`,
    html: `<p>${message}</p>`
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.json(err);
    }
    return res.json('Success');
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
