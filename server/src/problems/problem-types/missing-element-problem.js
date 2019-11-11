const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');
const {
  numberOfWrongOptions,
} = require('../constants');

/*
 * Фигура может занимать в поле одну из 9 позиций.
 * В задаче есть 9 полей, во всех фигура должна
 * занимать разные позиции.
 */

const generateProblemDescription = () => [0, 1, 2, 3, 4, 5, 6, 7, 8]
  .sort(() => Math.random() - 0.5);

const generateWrongOptions = description => description
  .filter(item => item !== null)
  .sort(() => Math.random() - 0.5)
  .slice(0, numberOfWrongOptions);

const convertToSvg = (code, seed) => svgCreator
  .newImage()
  .drawSmallFigure(seed, code)
  .getImage();

module.exports = problemTemplate.newProblemType({
  problemDescriptionGenerator: generateProblemDescription,
  wrongOptionsGenerator: generateWrongOptions,
  converterToSvg: convertToSvg,
});
