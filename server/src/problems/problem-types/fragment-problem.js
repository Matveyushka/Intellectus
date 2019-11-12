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
const spaceSize = 21;
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
      const stickProbability = 0.4;

      const stickLeft = Math.random() < stickProbability;
      const stickRight = Math.random() < stickProbability;
      const stickTop = Math.random() < stickProbability;
      const stickBottom = Math.random() < stickProbability;

      const stickPadding = 1;

      const randomPointInFieldLine = () => _.random(stickPadding, fieldSize - stickPadding);

      return {
        ...field,
        lines: field.lines.concat({
          xBegin: stickLeft ? stickPadding : randomPointInFieldLine(),
          yBegin: stickTop ? stickPadding : randomPointInFieldLine(),
          xEnd: stickRight ? (fieldSize - stickPadding) : randomPointInFieldLine(),
          yEnd: stickBottom ? (fieldSize - stickPadding) : randomPointInFieldLine(),
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
