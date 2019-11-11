const { shuffle } = require('../../utils/arrayShuffle');
const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');
const {
  greenColor,
  grayColor,
  redColor,
  numberOfWrongOptions,
} = require('../constants');

const directionsAmount = 8;

const getAroundPositions = (map, x, y) => {
  const up = (y - 1 + map.length) % map.length;
  const down = (y + 1) % map.length;
  const left = (x - 1 + map.length) % map[y].length;
  const right = (x + 1) % map[y].length;

  return [
    map[up][x],
    map[up][right],
    map[y][right],
    map[down][right],
    map[down][x],
    map[down][left],
    map[y][left],
    map[up][left],
  ];
};

const getNextStepDirection = stepsMap => x => y => nextStepNumber => maxStepNumber => (
  getAroundPositions(stepsMap, x, y)
    .indexOf(nextStepNumber === (maxStepNumber + 1) ? 0 : nextStepNumber)
);

const getDirectionsMap = stepsMap => stepsMap.map(
  (row, y) => row.map(
    (stepNumber, x) => (
      getNextStepDirection(stepsMap)(x)(y)(stepNumber + 1)(stepsMap.flat().length - 1)
    ),
  ),
);

/*
 * Условие задачи - 9 клеток со стрелками.
 * Если двигаться по направлению, указанному стрелками,
 * можно пройти цикл по всем клеткам.
 * Если стрелка указывает за пределы поля - движение идёт
 * так, будто поле замкнуто - выход с другой стороны поля.
 */

const generateProblemDescription = () => {
  const stepsAmount = 9;

  const randomSteps = shuffle([...Array(stepsAmount).keys()]);

  const stepsMap = [
    [randomSteps[0], randomSteps[1], randomSteps[2]],
    [randomSteps[3], randomSteps[4], randomSteps[5]],
    [randomSteps[6], randomSteps[7], randomSteps[8]],
  ];

  return getDirectionsMap(stepsMap).flat();
};

const generateWrongOptions = (description, solution) => shuffle(
  [...Array(directionsAmount).keys()].filter(item => item !== solution),
).slice(0, numberOfWrongOptions);

const arrows = [
  svgCreator.newImage().arrow,
  svgCreator.newImage().navigationArrow,
];

const xRotateOrigin = 50;
const yRotateOrigin = 50;

const rotators = Array(directionsAmount)
  .fill(null)
  .map((_item, index) => (image => image.rotate(
    (360 / directionsAmount) * index,
    xRotateOrigin,
    yRotateOrigin,
  )));

const colors = [
  greenColor,
  grayColor,
  redColor,
];

const convertToSvg = (code, seed) => rotators[code](
  arrows[seed % arrows.length]({
    x: 10,
    y: 10,
    size: 80,
    color: colors[seed % colors.length],
  }),
).getImage();

module.exports = problemTemplate.newProblemType({
  problemDescriptionGenerator: generateProblemDescription,
  wrongOptionsGenerator: generateWrongOptions,
  converterToSvg: convertToSvg,
});
