const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');
const {
  greenColor,
  grayColor,
  transparentColor,
  numberOfWrongAnswers,
} = require('../constants');

const generateTaskDescription = () => {
  /*
   * Каждый квадратик в условии задачи - это две фигуры - одна сверху, другая снизу.
   * Фигуры могут быть трёх типов, соответственно каждый тип обозначен цифрой от 0 до 2
   * Каждая фигура встречается на определённой позиции 3 раза.
   *
   * Получается, одно поле (квадратик) можно представить в виде двуразрядного числа, где
   * цифра старшего разряда - код фигуры сверху, а цифра младшего разраяда - цифра фигуры
   * снизу.
   */
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
    color: transparentColor,
    borderWidth: thickness,
    borderColor: newBorderColor,
  });

  const topGreenFigureParams = newFigureParamsFromTemplate(spaceSize, greenColor);
  const topGrayFigureParams = newFigureParamsFromTemplate(spaceSize, grayColor);
  const bottomGreenFigureParams = newFigureParamsFromTemplate(
    spaceSize + figureHeight + spaceSize,
    greenColor,
  );
  const bottomGrayFigureParams = newFigureParamsFromTemplate(
    spaceSize + figureHeight + spaceSize,
    grayColor,
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
