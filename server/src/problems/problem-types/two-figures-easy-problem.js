const svgCreator = require('../svg-creator');
const { shuffle } = require('../../utils/arrayShuffle');
const { seedRandom } = require('../../utils/seedRandom');
const problemTemplate = require('../problem-template');
const {
  whiteColor,
  grayColor,
  redColor,
  greenColor,
  numberOfWrongOptions,
} = require('../constants');

const figureTypesAmount = 3;

const createField = (bigFigureType, smallFigureType) => ({
  bigFigureType,
  smallFigureType,
});

/*
 * В данной задаче каждое поле заполнено двумя фигурами -
 * большой и малой. Есть 3 типа фигур, причём каждый
 * тип большой фигуры должен встречаться с каждым типом
 * малой фигуры.
 */

const generateProblemDescription = () => {
  const bigFigureTypes = [...Array(figureTypesAmount).keys()];
  const smallFigureTypes = [...Array(figureTypesAmount).keys()];

  return shuffle(
    bigFigureTypes.map(bigFigureType => smallFigureTypes
      .map(smallFigureType => createField(bigFigureType, smallFigureType))).flat(),
  );
};

const generateWrongOption = (description, solution) => {
  const option = createField(
    Math.floor(Math.random() * figureTypesAmount),
    Math.floor(Math.random() * figureTypesAmount),
  );

  const optionIsSolution = (option.bigFigureType === solution.bigFigureType
    && option.smallFigureType === solution.smallFigureType);

  return optionIsSolution ? generateWrongOption(description, solution) : option;
};

const generateWrongOptions = (description, solution) => Array(numberOfWrongOptions)
  .fill(null).map(() => generateWrongOption(description, solution));

const convertToSvg = (fieldDescription, seed) => {
  const randomNumbers = [
    seedRandom(seed),
    seedRandom(seed + 1),
    seedRandom(seed + 2),
    seedRandom(seed + 3),
  ];

  const bigFigureColors = [
    grayColor,
    redColor,
  ];

  const smallFigureColors = [
    whiteColor,
    greenColor,
  ];

  const bigFigureImageParams = {
    x: 5,
    y: 5,
    size: 90,
    color: bigFigureColors[randomNumbers[0] % bigFigureColors.length],
  };

  const smallFigureImageParams = {
    x: 38,
    y: 38,
    size: 24,
    color: smallFigureColors[randomNumbers[1] % smallFigureColors.length],
  };

  const bigFiguresImageCreators = [
    svgCreator.newImage().circle,
    svgCreator.newImage().square,
    svgCreator.newImage().triangle,
    svgCreator.newImage().pentagon,
  ];

  const bigFiguresImageCreatorsIndex = (fieldDescription.bigFigureType + randomNumbers[2])
    % bigFiguresImageCreators.length;

  const bigFigureImage = bigFiguresImageCreators[bigFiguresImageCreatorsIndex](
    bigFigureImageParams,
  );

  const smallFiguresImageAdder = [
    image => image.circle,
    image => image.square,
    image => image.triangle,
    image => image.pentagon,
  ];

  const randomSmallFigureImageAdderIndex = (fieldDescription.smallFigureType + randomNumbers[3])
    % smallFiguresImageAdder.length;

  return smallFiguresImageAdder[randomSmallFigureImageAdderIndex](
    bigFigureImage,
  )(
    smallFigureImageParams,
  ).getImage();
};

module.exports = problemTemplate.newProblemType({
  problemDescriptionGenerator: generateProblemDescription,
  wrongOptionsGenerator: generateWrongOptions,
  converterToSvg: convertToSvg,
});
