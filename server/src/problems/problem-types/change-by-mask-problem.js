const _ = require('lodash');

const { shuffle } = require('../../utils/arrayShuffle');

const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');

const cellsAmount = 9;

const cellCodes = {
  firstType: 0,
  secondType: 1,
  neutral: 2,
  toInvert: 3,
};

const randomDecision = (option1, option2) => (Math.random() > 0.5 ? option1 : option2);

const generateRandomFieldWithCells = (firstCell, secondCell) => shuffle(
  [
    firstCell,
    secondCell,
    ...Array(cellsAmount - 2)
      .fill(null)
      .map(() => randomDecision(firstCell, secondCell)),
  ],
);

const generateFirstLineField = () => generateRandomFieldWithCells(
  cellCodes.firstType,
  cellCodes.secondType,
);

const generateSecondLineField = () => generateRandomFieldWithCells(
  cellCodes.neutral,
  cellCodes.toInvert,
);

const generateThirdLineField = (firstLineField, secondLineField) => secondLineField.map(
  (maskCellCode, cellIndex) => (
    maskCellCode === cellCodes.neutral
      ? firstLineField[cellIndex]
      : (() => {
        if (firstLineField[cellIndex] === cellCodes.firstType) return cellCodes.secondType;

        if (firstLineField[cellIndex] === cellCodes.secondType) return cellCodes.firstType;

        return null;
      })()
  ),
);

const generateLine = () => {
  const firstField = generateFirstLineField();
  const secondField = generateSecondLineField();
  const thirdField = generateThirdLineField(firstField, secondField);

  return [firstField, secondField, thirdField];
};

/*
 * В каждой линии:
 * Первое поле - исходное - состоит из двух случайных типов фигур
 * Второе поле - преобразующее - состоит из двух типов фигур - нейтральной и меняющей
 * Третье поле - результат воздействия второго поля на первое:
 * нейтральная фиугра второго поля оставляет фигуру первого поля без изменений
 * меняющая фигурв второго поля меняет фигуру первого поля на другую
 */

const generateProblemDescription = () => [
  ...generateLine(),
  ...generateLine(),
  ...generateLine(),
];

const optionTypes = {
  random: 0,
  extreme: 1,
  middle: 2,
};

const generateWrongOption = (type, solution) => {
  const option = (() => {
    if (type === optionTypes.random) {
      return randomDecision(
        generateFirstLineField(),
        generateSecondLineField(),
      );
    }

    if (type === optionTypes.extreme) {
      return generateFirstLineField();
    }

    if (type === optionTypes.middle) {
      return generateSecondLineField();
    }

    return null;
  })();

  return _.isEqual(option, solution)
    ? generateWrongOption(type, solution)
    : option;
};

const generateWrongOptions = (_description, solution) => shuffle([
  generateWrongOption(optionTypes.middle, solution),
  generateWrongOption(optionTypes.middle, solution),
  generateWrongOption(optionTypes.extreme, solution),
  generateWrongOption(optionTypes.extreme, solution),
  generateWrongOption(optionTypes.random, solution),
]);

const convertToSvg = (field, seed) => {
  const fillImageFromCode = (image, codeToDraw, position = 0) => (
    position === cellsAmount
      ? image
      : fillImageFromCode(
        image.drawSmallFigure(seed + codeToDraw, position),
        field[position + 1],
        position + 1,
      ));

  return fillImageFromCode(svgCreator.newImage(), field[0]).getImage();
};

module.exports = problemTemplate.newProblemType({
  problemDescriptionGenerator: generateProblemDescription,
  wrongOptionsGenerator: generateWrongOptions,
  converterToSvg: convertToSvg,
  rotatable: true,
});
