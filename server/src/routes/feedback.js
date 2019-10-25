const validator = require('validator');
const express = require('express');
const transporter = require('../utils/mailSender');

const router = express.Router();

const minLengthName = 2;
const maxLengthName = 25;
const minLengthTitle = 1;
const maxLengthTitle = 35;

router.post('/', async (req, res) => {
  const {
    name, email, title, body,
  } = req.body;
  const checkExistParams = name && email && title && body;

  if (!checkExistParams) {
    return res.status(400).json({
      error: true,
      message: 'Данные не отправлены.',
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: true,
      message: 'Некорректный Email.',
    });
  }

  if (name.length < minLengthName || name.length > maxLengthName) {
    return res.status(400).json({
      error: true,
      message: `Имя должно содержать от ${minLengthName} до ${maxLengthName} символов.`,
    });
  }

  if (title.length < minLengthTitle || title.length > maxLengthTitle) {
    return res.status(400).json({
      error: true,
      message: `Заголовок должен содержать от ${minLengthTitle} до ${maxLengthTitle} символов.`,
    });
  }

  const message = {
    from: email,
    to: process.env.EMAIL_TO,
    subject: 'Feedback',
    html: `Имя - ${name} <br> Заголовок - ${title} <br> Cообщение - ${body}<br> Email - 
    ${email} `,
  };

  try {
    await transporter.mailSender(message);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      error: true,
      message: 'Возникла ошибка при отправке.',
    });
  }

  return res.status(200).json({
    error: false,
    message: 'Письмо отправлено.',
  });
});

module.exports = router;
