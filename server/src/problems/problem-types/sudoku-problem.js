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

const random0To2 = excludedVariant => (_.isNil(excludedVariant)
  ? Math.floor(Math.random() * 3)
  : (excludedVariant + Math.floor(Math.random() * 2) + 1)) % 3;

const transpose = sudokuMap => _.zip(...sudokuMap);

const swapRows = sudokuMap => row1 => row2 => sudokuMap.map((row, index) => {
  if (index === row1) return sudokuMap[row2].slice();

  if (index === row2) return sudokuMap[row1].slice();

  return row;
});

/*
 * Area - или район - это 3 сектора, идущих подряд
 * по горизонтали или вертикали
 */
const swapRowsInArea = sudokuMap => area => row1 => row2 => swapRows(
  sudokuMap,
)(
  area * sectorSize + row1,
)(
  area * sectorSize + row2,
);

const swapColumnsInArea = sudokuMap => area => column1 => column2 => transpose(
  swapRowsInArea(transpose(sudokuMap))(area)(column1)(column2),
);

const swapHorizontalAreas = sudokuMap => area1 => area2 => Array(sectorSize)
  .fill(null)
  .reduce(
    (currentSudokuMap, _value, index) => {
      const firstAreaRow = area1 * sectorSize + index;
      const secondAreaRow = area2 * sectorSize + index;

      return swapRows(currentSudokuMap)(firstAreaRow)(secondAreaRow);
    },
    sudokuMap,
  );

const swapVerticalAreas = sudokuMap => area1 => area2 => transpose(
  swapHorizontalAreas(transpose(sudokuMap))(area1)(area2),
);

const actions = [
  (sudokuMap) => {
    const area = random0To2();
    const column1 = random0To2();
    const column2 = random0To2(column1);

    return swapColumnsInArea(sudokuMap)(area)(column1)(column2);
  },
  (sudokuMap) => {
    const area = random0To2();
    const row1 = random0To2();
    const row2 = random0To2(row1);

    return swapRowsInArea(sudokuMap)(area)(row1)(row2);
  },
  (sudokuMap) => {
    const area1 = random0To2();
    const area2 = random0To2(area1);

    return swapHorizontalAreas(sudokuMap)(area1)(area2);
  },
  (sudokuMap) => {
    const area1 = random0To2();
    const area2 = random0To2(area1);

    return swapVerticalAreas(sudokuMap)(area1)(area2);
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
    const randomAction = actions[Math.floor(Math.random() * actions.length)];

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
