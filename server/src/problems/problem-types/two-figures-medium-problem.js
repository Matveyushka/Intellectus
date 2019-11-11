const svgCreator = require('../svg-creator');
const { seedRandom } = require('../../utils/seedRandom');
const problemTemplate = require('../problem-template');
const {
  redColor,
  greenColor,
  grayColor,
  numberOfWrongOptions,
} = require('../constants');

const generateProblemDescription = () => {
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

  return Array(numberOfWrongOptions).fill(0).map(() => generateOption());
};

const convertToSvg = (code, seed) => {
  const spaceSize = 8;
  const figureHeight = 38;
  const figureWidth = 84;

  const randomNumbers = [
    seedRandom(seed),
    seedRandom(seed + 1),
    seedRandom(seed + 2),
    seedRandom(seed + 3),
  ];

  const newFigureParamsFromTemplate = (y, color) => ({
    x: spaceSize,
    y,
    width: figureWidth,
    height: figureHeight,
    color,
  });

  const colors = [
    redColor,
    greenColor,
    grayColor,
  ];

  const figures = [
    image => image.ellipse,
    image => image.triangle,
    image => image.rectangle,
    image => image.pentagon,
  ];

  const topFigureVariant = (Math.floor(code / 10) + randomNumbers[0]) % figures.length;
  const bottomFigureVariant = ((code % 10) + randomNumbers[1]) % figures.length;
  const topColorIndex = (Math.floor(code / 10) + randomNumbers[2]) % colors.length;
  const bottomColorIndex = ((code % 10) + randomNumbers[3]) % colors.length;

  const topFigure = figures[topFigureVariant](
    svgCreator.newImage(),
  )(
    newFigureParamsFromTemplate(spaceSize, colors[topColorIndex]),
  );

  const resultFigure = figures[bottomFigureVariant](
    topFigure,
  )(
    newFigureParamsFromTemplate(spaceSize + figureHeight + spaceSize, colors[bottomColorIndex]),
  );

  return resultFigure.getImage();
};

module.exports = problemTemplate.newProblemType({
  problemDescriptionGenerator: generateProblemDescription,
  wrongOptionsGenerator: generateWrongOptions,
  converterToSvg: convertToSvg,
});
