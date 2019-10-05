const express = require('express');
const statistics = require('../db/dao/StatisticsDao');
const passedTest = require('../db/dao/PassedTestDao');
const session = require('../utils/session');
const testPack = require('../utils/testPack');

const router = express.Router();

router.post('/', async (req, res) => {
  const { answers, token } = req.body;

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

  const questionsToSend = test.questions.map( (problem, index) => ({
    problems: problem.problems,
    options: problem.options,
    solution: problem.rightOption,
    answer: answers[index],
  }));

  const rightOptions = testPack.getRightOptions(test);
  const points = testPack.getNumberOfCorrectAnswers(rightOptions, answers);
  const completedTest = {
    token,
    elapsedTime: session.getTimeSession(token),
    points,
    questions: questionsToSend,
  };

  await passedTest.insert(completedTest);

  const statisticsToSend = await statistics.get();

  res.status(201).json({
    rightOptions,
    statistics: statisticsToSend,
  });
});

module.exports = router;
