const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/send-email', (req, res) => {
  const { fullname, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USER, // use environment variables
      pass: process.env.EMAIL_PASS // use environment variables
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New message from ${fullname}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send email.' });
    }
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
