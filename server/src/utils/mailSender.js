require('dotenv').config();
const nodeMailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
const mailSender = async (message) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_LOGIN, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail(message, (error) => {
    console.info('123');
    if (error) {
      throw error;
    }
  });
};

module.exports = {
  mailer: mailSender,
};
