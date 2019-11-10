const _ = require('lodash');
const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');
const {
  redColor,
  grayColor,
  greenColor,
  numberOfWrongOptions,
} = require('../constants');

const fieldSize = 100;
const spaceSize = 59;
const generateFieldPadding = 30;

const createFieldCoordinates = (x, y, size) => ({
  from: { x, y },
  to: { x: x + size, y: y + size },
});

const fieldsCoordinates = [
  createFieldCoordinates(0, 0, fieldSize),
  createFieldCoordinates(fieldSize + spaceSize, 0, fieldSize),
  createFieldCoordinates((fieldSize + spaceSize) * 2, 0, fieldSize),
  createFieldCoordinates(0, fieldSize + spaceSize, fieldSize),
  createFieldCoordinates(fieldSize + spaceSize, fieldSize + spaceSize, fieldSize),
  createFieldCoordinates((fieldSize + spaceSize) * 2, fieldSize + spaceSize, fieldSize),
  createFieldCoordinates(0, (fieldSize + spaceSize) * 2, fieldSize),
  createFieldCoordinates(fieldSize + spaceSize, (fieldSize + spaceSize) * 2, fieldSize),
  createFieldCoordinates((fieldSize + spaceSize) * 2, (fieldSize + spaceSize) * 2, fieldSize),
];

const getFragment = (field, beginPoint, endPoint) => ({
  xBegin: beginPoint.x - field.from.x,
  yBegin: beginPoint.y - field.from.y,
  xEnd: endPoint.x - field.from.x,
  yEnd: endPoint.y - field.from.y,
});

const fragmentizeAndAddLine = (fields, beginPoint, endPoint) => fields.map((field) => {
  const fragment = getFragment(field, beginPoint, endPoint);

  return fragment ? { ...field, lines: field.lines.concat(fragment) } : field;
});

const generateLine = (fields, firstFieldCoordinates, secondFieldCoordinates) => {
  const beginPoint = {
    x: _.random(
      firstFieldCoordinates.from.x + generateFieldPadding,
      firstFieldCoordinates.to.x - generateFieldPadding,
    ),
    y: _.random(
      firstFieldCoordinates.from.y + generateFieldPadding,
      firstFieldCoordinates.to.y - generateFieldPadding,
    ),
  };
  const endPoint = {
    x: _.random(
      secondFieldCoordinates.from.x + generateFieldPadding,
      secondFieldCoordinates.to.x - generateFieldPadding,
    ),
    y: _.random(
      secondFieldCoordinates.from.y + generateFieldPadding,
      secondFieldCoordinates.to.y - generateFieldPadding,
    ),
  };

  return fragmentizeAndAddLine(fields, beginPoint, endPoint);
};

/*
 * Каждое поле условия задачи - это фрагмент одной
 * картинки, состоящей из множества отрезков.
 */

const generateProblemDescription = () => {
  const fieldsAmount = 9;
  const fields = Array(fieldsAmount).fill(null).map(
    (_field, index) => ({ ...fieldsCoordinates[index], lines: [] }),
  );

  return fieldsCoordinates.reduce((currentFields, firstFieldCoordinates, index) => {
    const secondFieldCoordinates = fieldsCoordinates[
      [...fieldsCoordinates.keys()].filter(item => item !== index)[Math.floor(Math.random() * 8)]
    ];

    return generateLine(currentFields, firstFieldCoordinates, secondFieldCoordinates);
  }, fields);
};

const generateWrongOption = (solution) => {
  const linesAmount = _.random(1, 3);

  const startField = { lines: [] };

  const option = Array(linesAmount).fill(null).reduce(
    (field) => {
      const stickLeft = Math.random() > 0.6;
      const stickRight = Math.random() > 0.6;
      const stickTop = Math.random() > 0.6;
      const stickBottom = Math.random() > 0.6;

      const stickPadding = 1;

      return {
        ...field,
        lines: field.lines.concat({
          xBegin: stickLeft ? stickPadding : _.random(1, fieldSize - stickPadding),
          yBegin: stickTop ? stickPadding : _.random(1, fieldSize - stickPadding),
          xEnd: stickRight ? (fieldSize - stickPadding) : _.random(1, fieldSize - stickPadding),
          yEnd: stickBottom ? (fieldSize - stickPadding) : _.random(1, fieldSize - stickPadding),
        }),
      };
    },
    startField,
  );

  return _.isEqual(option, solution)
    ? generateWrongOption(solution)
    : option;
};

const generateWrongOptions = (_description, solution) => Array(numberOfWrongOptions)
  .fill(null)
  .map(() => generateWrongOption(solution));

const convertToSvg = (field, seed) => {
  const colors = [
    greenColor, redColor, grayColor,
  ];

  const saltedSeed = seed + 17;

  return field
    .lines
    .reduce((image, line) => image.line(
      { ...line, color: colors[saltedSeed % colors.length] },
    ), svgCreator.newImage())
    .getImage();
};

module.exports = problemTemplate.newProblemType({
  problemDescriptionGenerator: generateProblemDescription,
  wrongOptionsGenerator: generateWrongOptions,
  converterToSvg: convertToSvg,
});
