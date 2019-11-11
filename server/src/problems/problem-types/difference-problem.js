const _ = require('lodash');

const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');
const { generateShuffledArray } = require('../../utils/arrayGenerators');
const {
  transparentColor,
  redColor,
  grayColor,
  greenColor,
  numberOfWrongOptions,
} = require('../constants');

const deformationTypes = {
  color: 0,
  size: 1,
  borderColor: 2,
  borderWidth: 3,
  rotation: 4,
  shape: 5,
  position: 6,
  proportion: 7,
  strikethrough: 8,
};

/*
 * Есть исходная фигура - в полях она не изображена
 * Вместо этого в каждом поле изображена фигура,
 * которая является деформированной исходной фигурой.
 * Каждая фигура есть результат лишь одной деформации.
 * Среди вариантов ответов лишь один - результат ещё одной деформации,
 * остальные же являются результатами двух деформаций.
 */

const generateProblemDescription = () => generateShuffledArray(Object.keys(deformationTypes).length)
  .map(item => [item]);

const generateWrongOption = () => {
  const randomKeys = generateShuffledArray(Object.keys(deformationTypes).length);

  const option = [
    randomKeys[0],
    randomKeys[1],
  ].sort((a, b) => a - b);

  return _.isEqual(option, [deformationTypes.rotation, deformationTypes.position])
    || _.isEqual(option, [deformationTypes.borderWidth, deformationTypes.position])
    ? generateWrongOption()
    : option;
};

const generateWrongOptions = () => Array(numberOfWrongOptions)
  .fill(null)
  .map(() => generateWrongOption());

const convertToSvg = (field, seed) => {
  const colorPallettes = [
    [transparentColor, greenColor, grayColor],
    [greenColor, transparentColor, grayColor],
    [transparentColor, redColor, grayColor],
    [greenColor, redColor, grayColor],
  ];

  const rotatableFigures = [
    svgCreator.newImage().triangle,
    svgCreator.newImage().rectangle,
    svgCreator.newImage().pentagon,
  ];

  const mainFigure = rotatableFigures[seed % rotatableFigures.length];
  const extraFigure = rotatableFigures[(seed + 1) % rotatableFigures.length];

  const fieldSize = 100;

  const [mainColor, extraColor, mainBorderColor] = colorPallettes[seed % colorPallettes.length];

  const color = field.includes(deformationTypes.color) ? extraColor : mainColor;

  const width = fieldSize * (field.includes(deformationTypes.size) ? 0.4 : 0.6);
  const height = field.includes(deformationTypes.proportion) ? (width * 1.2) : width;

  const borderColor = field.includes(deformationTypes.borderColor) ? extraColor : mainBorderColor;
  const borderWidth = fieldSize * (field.includes(deformationTypes.borderWidth) ? 0.1 : 0.05);

  const x = field.includes(deformationTypes.position) ? 5 : ((fieldSize - width) / 2);
  const y = (fieldSize - height) / 2;

  const rotationAngle = field.includes(deformationTypes.rotation) ? 45 : 0;
  const rotationXOrigin = x + width / 2;
  const rotationYOrigin = y + height / 2;

  const anotherShape = field.includes(deformationTypes.shape);
  const strikethrough = field.includes(deformationTypes.strikethrough);

  const figureParams = {
    x,
    y,
    color,
    width,
    height,
    borderWidth,
    borderColor,
  };

  const figure = (anotherShape
    ? extraFigure(figureParams)
    : mainFigure(figureParams))
    .rotate(rotationAngle, rotationXOrigin, rotationYOrigin);

  return strikethrough ? figure.line({
    xBegin: 0, yBegin: 0, xEnd: fieldSize, yEnd: fieldSize, color: borderColor,
  }).getImage() : figure.getImage();
};

module.exports = problemTemplate.newProblemType({
  problemDescriptionGenerator: generateProblemDescription,
  wrongOptionsGenerator: generateWrongOptions,
  converterToSvg: convertToSvg,
});
