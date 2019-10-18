require('dotenv').config();
const validator = require('validator');
const express = require('express');
const transporter = require('../utils/mailer');

const router = express.Router();

router.post('/', async (req, res) => {
    const {name, email, token, body, numberOfQuestion} = req.body;

    if (!(name && email && token && body && numberOfQuestion)) {
        res.status(400).json({
            error: true,
            message: 'Данные не отправлены.',
        });

        return;
    }
    if (!validator.isEmail(email)) {
        res.status(400).json({
            error: true,
            message: 'Некорректный Email.',
        });

        return;
    }


    if (name.length < 2 || name.length > 25) {
        res.status(400).json({
            error: true,
            message: 'Имя должно содержать от 2 до 25 символов.',
        });

        return;
    }

    if (numberOfQuestion < 1 || numberOfQuestion > 12) {
        res.status(400).json({
            error: true,
            message: 'Некорректный номер задания.',
        });

        return;
    }

    const message = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'Репорт',
        html: `Имя - ${name} <br> Cообщение - ${body} <br> Токен - ${token} <br> Email - ${email} <br> NumberOfQuestion - ${numberOfQuestion}`
    };
    await transporter.mailer(message);

    res.status(200).json({
        error: false,
        message: 'Письмо отправлено.'
    });

});

module.exports = router;
