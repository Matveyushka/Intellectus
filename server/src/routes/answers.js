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
  const processedSession = session.getSession(token);

  if (!processedSession) {
    res.status(404).json({
      error: true,
      message: 'Данные теста не найдены.',
    });

    return;
  }

  if (processedSession.finished) {
    res.status(404).json({
      error: true,
      message: 'Тест уже завершён.',
    });

    return;
  }

  session.finishSession(token);

  const questionsToSend = processedSession.questions.map((question, index) => ({
    problemFields: question.problemFields,
    options: question.options,
    solution: question.solution,
    answer: answers[index],
  }));

  const solutions = testPack.getSolutions(processedSession);

  const points = testPack.getNumberOfCorrectAnswers(solutions, answers);

  const completedTest = {
    token,
    completionTimestamp: new Date(),
    elapsedTime: session.getTimeSession(token),
    points,
    questions: questionsToSend,
  };

  await passedTest.insert(completedTest);

  res.status(201).json({
    solutions,
    pointsDistribution: await statistics.get(),
  });
});

module.exports = router;
