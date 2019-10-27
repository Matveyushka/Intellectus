const problemTemplate = require('./problem-template');
const { shuffle } = require('../utils/arrayShuffle');

const missingElementProblem = require('./problem-types/missing-element-problem');
const twoFiguresMediumProblem = require('./problem-types/two-figures-medium-problem');
const bitwiseProblem = require('./problem-types/bitwise-problem');
const sumProblem = require('./problem-types/sum-problem');
const twoFiguresEasyProblem = require('./problem-types/two-figures-easy-problem');
const sudokuProblem = require('./problem-types/sudoku-problem');
const magicSquareProblem = require('./problem-types/half-magic-square-problem');

const easyProblems = [
  magicSquareProblem,
  missingElementProblem,
  sumProblem,
  twoFiguresEasyProblem,
];

const mediumProblems = [
  twoFiguresMediumProblem,
];

const hardProblems = [
  sudokuProblem,
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
