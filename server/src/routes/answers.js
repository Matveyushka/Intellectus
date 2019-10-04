const express = require('express');
const statistics = require('../db/dao/StatisticsDao');
const passedTest = require('../db/dao/PassedTestDao');
const session = require('../utils/session');
const testPack = require('../utils/testPack');

const router = express.Router();

router.post('/', (req, res) => {
  const { answers } = req.body;
  const { token } = req.body;

  console.info();

  if (!(answers && token)) {
    res.status(400).json({
      error: true,
      message: 'Данные не отправлены.',
    });

    return;
  }

  if (answers.length !== 12) {
    res.status(400).json({
      error: true,
      message: 'Некорректное количество ответов.',
    });

    return;
  }
  const test = session.getSession(token);

  if (!test) {
    res.status(404).json({
      error: true,
      message: 'Данные теста не найдены.',
    });

    return;
  }
  const rightOptions = testPack.getRightOptions(test);
  const points = testPack.getNumberOfCorrectAnswers(rightOptions, answers);
  const completedTest = {
    token,
    elapsedTime: session.getTimeSession(token),
    points,
    questions: {
      problems: testPack.getProblems(test),
      options: testPack.getOptions(test),
      solutions: rightOptions,
      answers,
    },
  };


  passedTest.insert(completedTest).then(r => console.info(r));

  console.info('completedTest', completedTest);

  res.status(201).json({
    rightOptions,
    statistics: statistics.get(),
  });
});

module.exports = router;
