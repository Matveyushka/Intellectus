const svgCreator = require('../svg-creator');
const { shuffle } = require('../../utils/arrayShuffle');
const problemTemplate = require('../problem-template');
const {
  grayColor,
  greenColor,
  redColor,
} = require('../constants');

const maxValue = 5;
const minValue = 0;

const swapColumns = (square, column1, column2) => square.map(row => row.map(
  (item, index) => (() => {
    if (index === column1) return row[column2];

    if (index === column2) return row[column1];

    return item;
  })(),
));

const swapRows = (square, row1, row2) => square.map((row, index) => (() => {
  if (index === row1) { return square[row2]; }

  if (index === row2) { return square[row1]; }

  return row;
})());

const transformWithMask = (square, mask, transformation) => square.map(
  (row, rowNumber) => row.map(
    (item, index) => (index === mask[rowNumber] ? item + transformation : item),
  ),
);

const maskContainsMax = (square, mask) => mask.reduce(
  (contains, item, index) => (square[index][item] === maxValue) || contains,
  false,
);

const maskContainsMin = (square, mask) => mask.reduce(
  (contains, item, index) => (square[index][item] === minValue) || contains,
  false,
);

const mutate = (square) => {
  const mask = shuffle([0, 1, 2]);

  if (Math.random() > 0.5 && !maskContainsMax(square, mask)) {
    return transformWithMask(square, mask, 1);
  }

  if (!maskContainsMin(square, mask)) {
    return transformWithMask(square, mask, -1);
  }

  return square;
};

const actions = [
  (square) => {
    const column1 = Math.floor(Math.random() * 3);
    const column2 = (column1 + Math.floor(Math.random() * 2)) % 3;

    return swapColumns(square, column1, column2);
  },
  (square) => {
    const row1 = Math.floor(Math.random() * 3);
    const row2 = (row1 + Math.floor(Math.random() * 2)) % 3;

    return swapRows(square, row1, row2);
  },
  square => mutate(square),
];

const generateProblemDescription = () => {
  const shuffleDepth = 30;

  const startMagicSquare = [
    [3, 1, 4],
    [2, 5, 1],
    [3, 2, 3],
  ];

  return Array(shuffleDepth).fill(null).reduce((magicSquare) => {
    const randomAction = actions[Math.floor(Math.random() * actions.length)];

    return randomAction(magicSquare);
  }, startMagicSquare).flat();
};

const generateWrongOptions = (_description, solution) => {
  const optionsPack = [0, 1, 2, 3, 4, 5];

  return shuffle(optionsPack.filter(item => (item !== solution)));
};

const convertToSvg = (code, seed) => {
  const colors = [
    greenColor,
    redColor,
    grayColor,
  ];

  const color = colors[seed % colors.length];

  const figures = [
    /* 0 углов */
    svgCreator.newImage()
      .circle({
        x: 10,
        y: 10,
        size: 80,
        color,
      }),
    /* 1 угол */
    svgCreator.newImage()
      .circle({
        x: 10,
        y: 10,
        size: 80,
        color,
      })
      .square({
        x: 50,
        y: 50,
        size: 40,
        color,
      }),
    /* 2 угла */
    svgCreator.newImage()
      .circle({
        x: 10,
        y: 10,
        size: 80,
        color,
      })
      .square({
        x: 10,
        y: 10,
        size: 40,
        color,
      })
      .square({
        x: 50,
        y: 50,
        size: 40,
        color,
      }),
    /* 3 угла */
    svgCreator.newImage()
      .triangle({
        x: 10,
        y: 10,
        size: 80,
        color,
      }),
    /* 4 угла */
    svgCreator.newImage()
      .square({
        x: 10,
        y: 10,
        size: 80,
        color,
      }),
    /* 5 углов */
    svgCreator.newImage()
      .pentagon({
        x: 10,
        y: 10,
        size: 80,
        color,
      }),
  ];

  return figures[code].getImage();
};

module.exports = problemTemplate.newProblemType(
  generateProblemDescription,
  generateWrongOptions,
  convertToSvg,
);
