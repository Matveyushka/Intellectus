const express = require('express');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

router.post('/', urlencodedParser, (req, res) => {
  const { answers } = req.body;
  const { token } = req.body;
  if (!(answers && token)) {
    res.status(400).json({
      error: true,
      message: 'Данные не отправлены.',
    });
  }
  res.status(201).json({
    rightAnswers: 'rightAnswers',
    statistics: 'statistics',
  });
});

module.exports = router;
