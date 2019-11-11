const problemTemplate = require('./problem-template');
const { shuffle } = require('../utils/arrayShuffle');

const missingElementProblem = require('./problem-types/missing-element-problem');
const twoFiguresMediumProblem = require('./problem-types/two-figures-medium-problem');
const bitwiseProblem = require('./problem-types/bitwise-problem');
const sumProblem = require('./problem-types/sum-problem');
const twoFiguresEasyProblem = require('./problem-types/two-figures-easy-problem');
const sudokuProblem = require('./problem-types/sudoku-problem');
const magicSquareProblem = require('./problem-types/half-magic-square-problem');
const changeByMaskProblem = require('./problem-types/change-by-mask-problem');
const directionProblem = require('./problem-types/direction-problem');
const fragmentProblem = require('./problem-types/fragment-problem');
const differenceProblem = require('./problem-types/difference-problem');
const transormationProblem = require('./problem-types/transformation-problem');

const easyProblems = [
  missingElementProblem,
  twoFiguresEasyProblem,
  sumProblem,
  fragmentProblem,
];

const mediumProblems = [
  magicSquareProblem,
  directionProblem,
  twoFiguresMediumProblem,
  bitwiseProblem,
];

const hardProblems = [
  differenceProblem,
  changeByMaskProblem,
  sudokuProblem,
  transormationProblem,
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
