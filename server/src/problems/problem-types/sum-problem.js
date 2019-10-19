const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');
const { shuffle } = require('../../utils/arrayShuffle');

const {
  greenColor,
  grayColor,
  transparentColor,
  numberOfWrongOptions,
} = require('../constants');

const maxFiguresAmountInField = 9;
const maxStartFiguresAmountInField = 7;

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
    const startAmount = Math.floor(Math.random() * maxStartFiguresAmountInField) + 1;

    const maxStepSize = Math.floor((maxFiguresAmountInField - startAmount) / 2);

    const stepNumber = Math.floor(Math.random() * maxStepSize) + 1;

    return [startAmount, startAmount + stepNumber, startAmount + stepNumber * 2];
  };

  // 3 стиля на 9 клеток - обозначаются цифрами от 0 до 2
  const fieldsStyles = shuffle([0, 0, 0, 1, 1, 1, 2, 2, 2]);

  return [
    ...generateLine(),
    ...generateLine(),
    ...generateLine(),
  ].map((field, index) => createFieldDescription(field, fieldsStyles[index]));
};

const validateField = (problemDescription, fieldToValidate) => {
  const descriptionToCheck = problemDescription
    .map(field => (field === null ? fieldToValidate : field));

  // Стили обозначены цифрами 0, 1 и 2 - каждая по 3 раза. 0*3 + 1*3 + 2*3 = 9
  const styleHashSum = 9;

  const styleCheckSum = descriptionToCheck.reduce((checkSum, field) => checkSum + field.style, 0);

  if (styleCheckSum !== styleHashSum) {
    return false;
  }

  if (descriptionToCheck[2].figuresAmount - descriptionToCheck[1].figuresAmount
    !== descriptionToCheck[1].figuresAmount - descriptionToCheck[0].figuresAmount
    || descriptionToCheck[5].figuresAmount - descriptionToCheck[4].figuresAmount
    !== descriptionToCheck[4].figuresAmount - descriptionToCheck[3].figuresAmount
    || descriptionToCheck[8].figuresAmount - descriptionToCheck[7].figuresAmount
    !== descriptionToCheck[7].figuresAmount - descriptionToCheck[6].figuresAmount) {
    return false;
  }

  return true;
};

const generateWrongOption = (problemDescription, maxFiguresAmount, styleTopBound) => {
  const figuresAmount = Math.floor(Math.random() * maxFiguresAmount) + 1;
  const style = Math.floor(Math.random() * styleTopBound);

  const wrongOption = createFieldDescription(
    figuresAmount,
    style,
  );

  return validateField(problemDescription, wrongOption)
    ? generateWrongOption(problemDescription, maxFiguresAmount, styleTopBound)
    : wrongOption;
};

const generateWrongOptions = problemDescription => Array(numberOfWrongOptions)
  .fill(null)
  .map(() => generateWrongOption(problemDescription, maxFiguresAmountInField, 2));

const convertToSvg = (fieldDescription, seed) => {
  const elementSize = 28;
  const spaceSize = 4;
  const thickness = 1;
  const numberOfElementsInLine = 3;

  let image = svgCreator.newImage();

  const fillImageFromCode = (figuresLeft, position = 0) => {
    if (figuresLeft === 0) return;

    const seededPosition = ((position + seed) % 9);

    const xPosition = spaceSize
      + (seededPosition % numberOfElementsInLine)
      * (spaceSize + elementSize);

    const yPosition = spaceSize
      + Math.floor(seededPosition / numberOfElementsInLine)
      * (spaceSize + elementSize);

    const createImageParams = color => ({
      x: xPosition,
      y: yPosition,
      size: elementSize,
      color: transparentColor,
      borderWidth: thickness,
      borderColor: color,
    });

    const greenImageParams = createImageParams(greenColor);

    const grayImageParams = createImageParams(grayColor);

    const figures = [
      () => image.circle(greenImageParams),
      () => image.square(greenImageParams),
      () => image.circle(grayImageParams),
      () => image.square(grayImageParams),
    ];

    const randomFigure = (seed + fieldDescription.style) % figures.length;

    image = figures[randomFigure]();

    fillImageFromCode(figuresLeft - 1, position + 1);
  };

  fillImageFromCode(fieldDescription.figuresAmount);

  return image.getImage();
};

module.exports = problemTemplate.newProblemType(
  generateProblemDescription,
  generateWrongOptions,
  convertToSvg,
);
