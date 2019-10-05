const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');

const strokeColorGray = '#636363';
const strokeColorGreen = '#88c8b0';
const fillColor = 'rgba(0,0,0,0)';
const numberOfWrongAnswers = 5;

const generateTaskDescription = () => {
  const topArray = [0, 0, 0, 1, 1, 1, 2, 2, 2].sort(() => Math.random() - 0.5);
  const bottomArray = [0, 0, 0, 1, 1, 1, 2, 2, 2].sort(() => Math.random() - 0.5);

  return topArray.map((field, index) => field * 10 + bottomArray[index]);
};

const generateWrongOptions = (description) => {
  const checkProblemValidity = (possibleOption) => {
    const descriptionToCheck = description.map(
      field => (field === null ? possibleOption : field),
    );

    const hashSum = 99;

    return descriptionToCheck.reduce((accumulator, value) => accumulator + value) === hashSum;
  };

  const generateOption = () => {
    const possibleOption = Math.floor(Math.random() * 3) * 10 + Math.floor(Math.random() * 3);

    return checkProblemValidity(possibleOption) ? generateOption() : possibleOption;
  };

  const generateSet = () => {
    const set = [...new Set(Array(numberOfWrongAnswers).fill(0).map(() => generateOption()))];

    return set.length === numberOfWrongAnswers ? set : generateSet();
  };

  return generateSet();
};

const convertToSvg = (code, seed) => {
  const spaceSize = 8;
  const figureHeight = 38;
  const figureWidth = 84;
  const thickness = 1;

  let image = svgCreator.newImage();

  const newFigureParamsFromTemplate = (newY, newBorderColor) => ({
    x: spaceSize,
    y: newY,
    width: figureWidth,
    height: figureHeight,
    color: fillColor,
    borderWidth: thickness,
    borderColor: newBorderColor,
  });

  const topGreenFigureParams = newFigureParamsFromTemplate(spaceSize, strokeColorGreen);
  const topGrayFigureParams = newFigureParamsFromTemplate(spaceSize, strokeColorGray);
  const bottomGreenFigureParams = newFigureParamsFromTemplate(
    spaceSize + figureHeight + spaceSize,
    strokeColorGreen,
  );
  const bottomGrayFigureParams = newFigureParamsFromTemplate(
    spaceSize + figureHeight + spaceSize,
    strokeColorGray,
  );

  const topFigureDrawingVariants = [
    () => image.ellipse(topGreenFigureParams),
    () => image.rectangle(topGreenFigureParams),
    () => image.ellipse(topGrayFigureParams),
    () => image.rectangle(topGrayFigureParams),
  ];

  const bottomFigureDrawingVariants = [
    () => image.ellipse(bottomGreenFigureParams),
    () => image.rectangle(bottomGreenFigureParams),
    () => image.ellipse(bottomGrayFigureParams),
    () => image.rectangle(bottomGrayFigureParams),
  ];

  const topFigureVariant = (Math.floor(code / 10) + seed) % topFigureDrawingVariants.length;
  const bottomFigureVariant = ((code % 10) + seed) % bottomFigureDrawingVariants.length;

  image = topFigureDrawingVariants[topFigureVariant]();

  image = bottomFigureDrawingVariants[bottomFigureVariant]();

  return image.getImage();
};

module.exports = problemTemplate.newProblemType(
  generateTaskDescription,
  generateWrongOptions,
  convertToSvg,
);
