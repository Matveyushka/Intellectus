const easyProblem = require('./easy-problem-creator');

const testCreator = {};

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

testCreator.createProblemsPack = (problemsLevels) => {
  const problemsPack = problemsLevels.map((e) => createProblemWithLevel[e]());
  return problemsPack;
};

testCreator.createStandardProblemsPack = () => {
  const problemsPack = testCreator.createProblemsPack(
    ['e', 'e', 'e', 'e', 'm', 'm', 'm', 'm', 'h', 'h', 'h', 'h'],
  );

  return problemsPack;
};

module.exports = testCreator;
