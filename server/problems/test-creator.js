const easyProblem = require('./easy-problem-creator');

//  Пока готов только один генератор задач - он работает на все
//  уровни сложности
const createProblemWithLevel = {
  e: easyProblem.createProblem,
  easy: easyProblem.createProblem,
  m: easyProblem.createProblem,
  medium: easyProblem.createProblem,
  h: easyProblem.createProblem,
  hard: easyProblem.createProblem,
};

/** @exports */
const createProblemsPack = (problemsLevels) => {
  const problemsPack = problemsLevels.map((item) => createProblemWithLevel[item]());
  return problemsPack;
};

/** @exports */
const createStandardProblemsPack = () => {
  const problemsPack = createProblemsPack(
    ['e', 'e', 'e', 'e', 'm', 'm', 'm', 'm', 'h', 'h', 'h', 'h'],
  );

  return problemsPack;
};

module.exports = {
  createProblemsPack,
  createStandardProblemsPack,
};
