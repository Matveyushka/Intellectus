const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');
const {
  grayColor,
  numberOfWrongAnswers,
  transparentColor,
} = require('../constants');

const maxNumberIn9Bits = 512;

/*
 * Каждое поле представляет собой сетку из фигур или пробелов 3х3
 * Все фигуры на поле одинаковые, соответственно поле можно
 * представить или как массив 3х3 из true, false (1 и 0),
 * или как число с максимальным значением 2 ^ 9 - 1 = 511 (от 000 000 000 до 111 111 111)
 * Так как принцип задачи строится на логических операциях,
 * применяемых между двумя полями, с целью сократить объём кода
 * было принятно решение использовать числовую форму вкупе
 * с побитовыми операциями.
 */

const generateTaskDescription = () => {
  const generateField = (excludedVariant = 0) => {
    //  Минус два и плюс один, чтобы исключить генерацию крайних значений - 0 и 511
    const field = Math.floor(Math.random() * (maxNumberIn9Bits - 2)) + 1;

    const isExcluded = field === excludedVariant;
    const isSelfSufficient = (excludedVariant !== 0
      // eslint-disable-next-line no-bitwise
      && ((field | excludedVariant) === field || (field | excludedVariant) === excludedVariant));

    return (isExcluded || isSelfSufficient)
      ? generateField(excludedVariant)
      : field;
  };

  const generateLineOfProblem = () => {
    const firstField = generateField();
    const secondField = generateField(firstField);
    // eslint-disable-next-line no-bitwise
    const resultField = firstField | secondField;

    return [firstField, secondField, resultField];
  };

  return [
    ...generateLineOfProblem(),
    ...generateLineOfProblem(),
    ...generateLineOfProblem(),
  ];
};

const generateWrongOptions = (description) => {
  const numberOfElementsInLineOfField = 3;
  const numberOfProblemLines = 3;

  const checkFieldsValidity = (possibleOption) => {
    const descriptionToCheck = description
      .map(field => (field === null ? possibleOption : field));

    const numberOfValidLines = descriptionToCheck
      .filter((field, index) => (index % numberOfElementsInLineOfField === 2)
        // eslint-disable-next-line no-bitwise
        && ((descriptionToCheck[index - 1] | descriptionToCheck[index - 2]) === field))
      .length;

    return numberOfValidLines === numberOfProblemLines;
  };

  const generateField = () => {
    const field = Math.floor(Math.random() * maxNumberIn9Bits);

    return (field === 0 || checkFieldsValidity(field))
      ? generateField()
      : field;
  };

  return Array(numberOfWrongAnswers).fill(0).map(() => generateField());
};

const convertToSvg = (code, seed) => {
  const elementSize = 28;
  const spaceSize = 4;
  const thickness = 1;
  const numberOfElementsInLine = 3;

  let image = svgCreator.newImage();

  const fillImageFromCode = (codeToDraw, position = 0) => {
    if (codeToDraw === 0) return;

    if (codeToDraw % 2 === 1) {
      const figures = [
        image.circle,
        image.square,
      ];

      const xPosition = spaceSize
        + (position % numberOfElementsInLine)
        * (spaceSize + elementSize);

      const yPosition = spaceSize
        + Math.floor(position / numberOfElementsInLine)
        * (spaceSize + elementSize);

      image = figures[seed % figures.length]({
        x: xPosition,
        y: yPosition,
        size: elementSize,
        color: transparentColor,
        borderWidth: thickness,
        borderColor: grayColor,
      });
    }

    fillImageFromCode(Math.floor(codeToDraw / 2), position + 1);
  };

  fillImageFromCode(code);

  return image.getImage();
};

module.exports = problemTemplate.newProblemType(
  generateTaskDescription,
  generateWrongOptions,
  convertToSvg,
);
