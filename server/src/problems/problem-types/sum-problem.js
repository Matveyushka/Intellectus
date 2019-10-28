const _ = require('lodash');

const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');
const { shuffle } = require('../../utils/arrayShuffle');

const {
  numberOfWrongOptions,
} = require('../constants');

const maxFiguresAmountInField = 9;
const maxStartFiguresAmountInField = 7;
const stylesAmount = 3;

const createFieldDescription = (figuresAmount, style) => ({ figuresAmount, style });

/*
 * В данной задаче есть два необходимых условия:
 * 1) В пределах одной строки (3 клетки) количество фигур должно изменяться
 *    с одним и тем же шагом.
 *    Например в певрой клетке 4 фигуры, во второй 6, в последней 8 - шаг 2.
 * 2) В каждой клетке все фигуры изображены в одном стиле (цвет и форма)
 *    Всего таких стилей 3 - каждый должен быть ровно в 3 клетках (всего клеток 9)
 */
const generateProblemDescription = () => {
  const generateLine = () => {
    const startFiguresAmount = Math.floor(Math.random() * maxStartFiguresAmountInField) + 1;

    const maxStepSize = Math.floor((maxFiguresAmountInField - startFiguresAmount) / 2);

    const stepNumber = Math.floor(Math.random() * maxStepSize) + 1;

    return [
      startFiguresAmount,
      startFiguresAmount + stepNumber,
      startFiguresAmount + stepNumber * 2];
  };

  // 3 стиля на 9 клеток - обозначаются цифрами от 0 до 2
  const fieldsStyles = shuffle([0, 0, 0, 1, 1, 1, 2, 2, 2]);

  return [
    ...generateLine(),
    ...generateLine(),
    ...generateLine(),
  ].map((field, index) => createFieldDescription(field, fieldsStyles[index]));
};

const generateWrongOption = (style, maxFiguresAmount, solution) => {
  const figuresAmount = Math.floor(Math.random() * maxFiguresAmount) + 1;

  const wrongOption = createFieldDescription(figuresAmount, style);

  return _.isEqual(solution, wrongOption)
    ? generateWrongOption(style, maxFiguresAmount, solution)
    : wrongOption;
};

const generateWrongOptions = (_problemDescription, solution) => shuffle(Array(numberOfWrongOptions)
  .fill(null)
  .map((_item, index) => {
    const styleCode = (() => {
      if (index === 0) return solution.style;

      if (index === 1 || index === 2) return (solution.style + 1) % stylesAmount;

      if (index === 3 || index === 4) return (solution.style + 2) % stylesAmount;

      return null;
    })();

    return generateWrongOption(
      styleCode,
      maxFiguresAmountInField,
      solution,
    );
  }));

const convertToSvg = (fieldDescription, seed) => {
  const fillImage = (image, figuresLeft, position = 0) => {
    if (figuresLeft === 0) return image;

    return fillImage(
      image.drawSmallFigure(
        fieldDescription.style + seed,
        (position + seed) % maxFiguresAmountInField,
      ),
      figuresLeft - 1,
      position + 1,
    );
  };

  return fillImage(svgCreator.newImage(), fieldDescription.figuresAmount).getImage();
};

module.exports = problemTemplate.newProblemType(
  generateProblemDescription,
  generateWrongOptions,
  convertToSvg,
);
