const problemTemplate = require('./problem-template');

const missingElementProblem = require('./problem-types/missing-element-problem');
const equalAmountEasyProblem = require('./problem-types/equal-amount-easy-problem');
const bitwiseProblem = require('./problem-types/bitwise-problem');

const easyProblems = [
  missingElementProblem,
];

const mediumProblems = [
  equalAmountEasyProblem,
];

const hardProblems = [
  bitwiseProblem,
];

const levels = {
  e: easyProblems,
  easy: easyProblems,
  m: mediumProblems,
  medium: mediumProblems,
  h: hardProblems,
  hard: hardProblems,
};

/** @exports */
const createProblemsPack = (problemsLevels) => {
  const problemsPack = problemsLevels.map((level) => {
    const numberOfProblemInArray = Math.floor(Math.random() * levels[level].length);
    const choosedProblem = levels[level][numberOfProblemInArray];

    return problemTemplate.realizeProblem(choosedProblem);
  });

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
