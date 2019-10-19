const problemTemplate = require('./problem-template');
const { shuffle } = require('../utils/arrayShuffle');

const missingElementProblem = require('./problem-types/missing-element-problem');
const equalAmountEasyProblem = require('./problem-types/equal-amount-easy-problem');
const bitwiseProblem = require('./problem-types/bitwise-problem');
const sumProblem = require('./problem-types/sum-problem');

const easyProblems = [
  missingElementProblem,
  sumProblem,
];

const mediumProblems = [
  equalAmountEasyProblem,
];

const hardProblems = [
  bitwiseProblem,
];

const getShuffledProblemsFromArray = (amount, array) => shuffle(Array(amount)
  .fill(null)
  .map((_item, index) => array[index % array.length]));

const createProblemsPack = (easyProblemsAmount, mediumProblemsAmount, hardProblemsAmount) => [
  ...getShuffledProblemsFromArray(easyProblemsAmount, easyProblems),
  ...getShuffledProblemsFromArray(mediumProblemsAmount, mediumProblems),
  ...getShuffledProblemsFromArray(hardProblemsAmount, hardProblems),
].map(problem => problemTemplate.createProblem(problem));

const createStandardProblemsPack = () => createProblemsPack(4, 4, 4);

module.exports = {
  createProblemsPack,
  createStandardProblemsPack,
};
