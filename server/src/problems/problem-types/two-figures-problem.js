const svgCreator = require('../svg-creator');
const { shuffle } = require('../../utils/arrayShuffle');
const problemTemplate = require('../problem-template');
const {
  grayColor,
  transparentColor,
  numberOfWrongOptions,
} = require('../constants');

const figureTypesAmount = 3;

const createField = (bigFigureType, smallFigureType) => ({
  bigFigureType,
  smallFigureType,
});

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
  const thickness = 1;

  const bigFigureImageParams = {
    x: 5,
    y: 5,
    size: 90,
    color: transparentColor,
    borderWidth: thickness,
    borderColor: grayColor,
  };

  const smallFigureImageParams = {
    x: 38,
    y: 38,
    size: 24,
    color: transparentColor,
    borderWidth: thickness,
    borderColor: grayColor,
    borderRadius: 0,
  };

  const bigFiguresImageCreators = [
    () => svgCreator.newImage().circle(bigFigureImageParams),
    () => svgCreator.newImage().square(bigFigureImageParams),
    () => svgCreator.newImage().triangle(bigFigureImageParams),
  ];

  const bigFiguresImageCreatorsIndex = (fieldDescription.bigFigureType + seed)
    % bigFiguresImageCreators.length;

  const bigFigureImage = bigFiguresImageCreators[bigFiguresImageCreatorsIndex]();

  const smallFiguresImageAdder = [
    () => bigFigureImage.circle(smallFigureImageParams),
    () => bigFigureImage.square(smallFigureImageParams),
    () => bigFigureImage.triangle(smallFigureImageParams),
  ];

  const randomSmallFigureImageAdderIndex = (fieldDescription.smallFigureType + seed)
  % smallFiguresImageAdder.length;

  return smallFiguresImageAdder[randomSmallFigureImageAdderIndex]().getImage();
};

module.exports = problemTemplate.newProblemType(
  generateProblemDescription,
  generateWrongOptions,
  convertToSvg,
);
