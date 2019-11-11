const _ = require('lodash');

const svgCreator = require('../svg-creator');
const { generateShuffledArray } = require('../../utils/arrayGenerators');
const problemTemplate = require('../problem-template');
const {
  grayColor,
  numberOfWrongOptions,
} = require('../constants');

/*
 * Каждое поле состоит из четырёх отрезков, каждый из которых
 * может быть развёрнут под 2 разными углами - у каждого отрезка
 * есть 2 возможных состояния. Если взять верхнее левое поле за
 * начальное, то состояния отрезков меняются при движении по полю:
 * один из отрезков меняет своё состояние при первом шаге вправо
 * второй - при втором шаге вправо
 * третий - при первом шаге вниз
 * последний - при втором шаге вниз
 */

const generateProblemDescription = () => {
  const linesAmount = 3;
  const fieldsAmountInLine = 3;

  const stepsAmountInLine = fieldsAmountInLine - 1;

  const transformationMap = generateShuffledArray(stepsAmountInLine);

  return Array(linesAmount)
    .fill(null)
    .map((_row, rowIndex) => Array(fieldsAmountInLine).fill(null).map(
      (_item, columnIndex) => [
        rowIndex > transformationMap[0],
        columnIndex > transformationMap[1],
        rowIndex > transformationMap[1],
        columnIndex > transformationMap[0],
      ],
    )).flat();
};

const generateWrongOption = (solution) => {
  const tranformationProbability = 0.5;

  const option = [
    Math.random() > tranformationProbability,
    Math.random() > tranformationProbability,
    Math.random() > tranformationProbability,
    Math.random() > tranformationProbability,
  ];

  return _.isEqual(option, solution)
    ? generateWrongOption(solution)
    : option;
};

const generateWrongOptions = (description, solution) => Array(numberOfWrongOptions)
  .fill(null)
  .map(() => generateWrongOption(solution));

const convertToSvg = (code, seed) => {
  const segmentWidth = 40;
  const segmentHeight = 40;

  const paramsFunctions = [
    (x, y) => ({
      xBegin: x,
      yBegin: y,
      xEnd: x + segmentWidth,
      yEnd: y + segmentHeight,
      color: grayColor,
    }),
    (x, y) => ({
      xBegin: x + segmentWidth,
      yBegin: y,
      xEnd: x,
      yEnd: y + segmentHeight,
      color: grayColor,
    }),
  ];

  const seed1 = seed % 2;
  const seed2 = Math.floor(seed / 13) % 2;
  const seed3 = Math.floor(seed / 17) % 2;
  const seed4 = Math.floor(seed / 7) % 2;

  return svgCreator
    .newImage()
    .line(paramsFunctions[(seed1 + code[0]) % 2](10, 10))
    .line(paramsFunctions[(seed2 + code[1]) % 2](50, 10))
    .line(paramsFunctions[(seed3 + code[2]) % 2](10, 50))
    .line(paramsFunctions[(seed4 + code[3]) % 2](50, 50))
    .getImage();
};

module.exports = problemTemplate.newProblemType({
  problemDescriptionGenerator: generateProblemDescription,
  wrongOptionsGenerator: generateWrongOptions,
  converterToSvg: convertToSvg,
});
