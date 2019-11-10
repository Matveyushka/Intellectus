const _ = require('lodash');

const svgCreator = require('../svg-creator');
const { shuffle } = require('../../utils/arrayShuffle');
const problemTemplate = require('../problem-template');
const {
  grayColor,
  numberOfWrongOptions,
} = require('../constants');

const generateProblemDescription = () => {
  const fieldsInLine = 3;

  const stepsInLine = fieldsInLine - 1;

  const transformationMap = shuffle(
    [...Array(stepsInLine).keys()],
  );

  return Array(3)
    .fill(null)
    .map((_row, rowIndex) => Array(3).fill(null).map(
      (_item, columnIndex) => [
        rowIndex > transformationMap[0],
        columnIndex > transformationMap[1],
        rowIndex > transformationMap[1],
        columnIndex > transformationMap[0],
      ],
    )).flat();
};

const generateWrongOption = (solution) => {
  const option = [
    Math.random() > 0.5,
    Math.random() > 0.5,
    Math.random() > 0.5,
    Math.random() > 0.5,
  ];

  return _.isEqual(option, solution)
    ? generateWrongOption(solution)
    : option;
};

const generateWrongOptions = (description, solution) => Array(numberOfWrongOptions)
  .fill(null)
  .map(() => generateWrongOption(solution));

const convertToSvg = (code, seed) => {
  const paramsFunctions = [
    (x, y) => ({
      xBegin: x,
      yBegin: y,
      xEnd: x + 40,
      yEnd: y + 40,
      color: grayColor,
    }),
    (x, y) => ({
      xBegin: x + 40,
      yBegin: y,
      xEnd: x,
      yEnd: y + 40,
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
