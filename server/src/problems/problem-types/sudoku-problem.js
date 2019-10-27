const _ = require('lodash');

const { shuffle } = require('../../utils/arrayShuffle');
const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');
const {
  numberOfWrongOptions,
} = require('../constants');

/* Шаблон поля судоку - через его трансформации будет получено другое валидное поле */
const sudokuTemplate = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [9, 1, 2, 3, 4, 5, 6, 7, 8],
];

/* Сектор - одно из 9 частей поля судоку 3x3 */
const sectorsAmount = 9;
const sectorSize = 3;

const random = (max, excludedVariant) => {
  const randomNumber = _.random(max);

  return randomNumber === excludedVariant
    ? random(max, excludedVariant)
    : randomNumber;
};

const transpose = sudokuMap => _.zip(...sudokuMap);

const swapRows = (sudokuMap, firstRowIndex, secondRowIndex) => sudokuMap.map((row, index) => {
  if (index === firstRowIndex) return sudokuMap[secondRowIndex].slice();

  if (index === secondRowIndex) return sudokuMap[firstRowIndex].slice();

  return row;
});

/*
 * Area - или район - это 3 сектора, идущих подряд
 * по горизонтали или вертикали
 */
const swapRowsInArea = sudokuMap => area => firstRowIndex => secondRowIndex => swapRows(
  sudokuMap,
  area * sectorSize + firstRowIndex,
  area * sectorSize + secondRowIndex,
);

const swapColumnsInArea = sudokuMap => area => firstColumnIndex => secondColumnIndex => transpose(
  swapRowsInArea(transpose(sudokuMap))(area)(firstColumnIndex)(secondColumnIndex),
);

const swapHorizontalAreas = (sudokuMap, firstAreaNumber, secondAreaNumber) => Array(sectorSize)
  .fill(null)
  .reduce(
    (currentSudokuMap, _value, index) => {
      const firstAreaRow = firstAreaNumber * sectorSize + index;
      const secondAreaRow = secondAreaNumber * sectorSize + index;

      return swapRows(currentSudokuMap, firstAreaRow, secondAreaRow);
    },
    sudokuMap,
  );

const swapVerticalAreas = (sudokuMap, firstAreaNumber, secondAreaNumber) => transpose(
  swapHorizontalAreas(transpose(sudokuMap), firstAreaNumber, secondAreaNumber),
);

const actions = [
  (sudokuMap) => {
    const area = random(sectorSize - 1);
    const firstColumnIndex = random(sectorSize - 1);
    const secondColumnIndex = random(sectorSize - 1, firstColumnIndex);

    return swapColumnsInArea(sudokuMap)(area)(firstColumnIndex)(secondColumnIndex);
  },
  (sudokuMap) => {
    const area = random(sectorSize - 1);
    const firstRowIndex = random(sectorSize - 1);
    const secondRowIndex = random(sectorSize - 1, firstRowIndex);

    return swapRowsInArea(sudokuMap)(area)(firstRowIndex)(secondRowIndex);
  },
  (sudokuMap) => {
    const firstAreaNumber = random(sectorSize - 1);
    const secondAreaNumber = random(sectorSize - 1, firstAreaNumber);

    return swapHorizontalAreas(sudokuMap, firstAreaNumber, secondAreaNumber);
  },
  (sudokuMap) => {
    const firstAreaNumber = random(sectorSize - 1);
    const secondAreaNumber = random(sectorSize - 1, firstAreaNumber);

    return swapVerticalAreas(sudokuMap, firstAreaNumber, secondAreaNumber);
  },
  sudokuMap => transpose(sudokuMap),
];

const getSector = (sudokuMap, x, y) => [
  sudokuMap[x][y], sudokuMap[x + 1][y], sudokuMap[x + 2][y],
  sudokuMap[x][y + 1], sudokuMap[x + 1][y + 1], sudokuMap[x + 2][y + 1],
  sudokuMap[x][y + 2], sudokuMap[x + 1][y + 2], sudokuMap[x + 2][y + 2],
];

/*
 * Вся задача - это поле судоку, только вместо цифр - фигуры
 * Ответ должен не нарушать принципов судоку при подстановке.
 */
const generateProblemDescription = () => {
  const shuffleDepth = 30;

  const sudoku = Array(shuffleDepth).fill(null).reduce((sudokuMap) => {
    const randomAction = actions[_.random(actions.length - 1)];

    return randomAction(sudokuMap);
  }, sudokuTemplate);

  const sectors = Array(sectorsAmount).fill(null)
    .map((_item, index) => {
      const sectorX = (index % sectorSize) * sectorSize;
      const sectorY = Math.floor(index / sectorSize) * sectorSize;

      return getSector(sudoku, sectorX, sectorY);
    });

  return sectors;
};

const generateWrongOption = (solution) => {
  const sectorTemplate = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const option = shuffle(sectorTemplate);

  return _.isEqual(option, solution)
    ? generateWrongOption(solution)
    : option;
};

const generateWrongOptions = (_description, solution) => Array(numberOfWrongOptions).fill(null)
  .map(() => generateWrongOption(solution));

const convertToSvg = (code, seed) => {
  const drawFromCode = (field, codeToDraw, position) => field.drawSmallFigure(
    codeToDraw + seed,
    position,
  );

  return code.reduce(
    (image, figure, index) => drawFromCode(image, figure, index),
    svgCreator.newImage(),
  ).getImage();
};

module.exports = problemTemplate.newProblemType(
  generateProblemDescription,
  generateWrongOptions,
  convertToSvg,
);
