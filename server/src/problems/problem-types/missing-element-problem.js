const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');
const {
  grayColor,
  transparentColor,
  numberOfWrongOptions,
} = require('../constants');

const generateProblemDescription = () => [0, 1, 2, 3, 4, 5, 6, 7, 8]
  .sort(() => Math.random() - 0.5);

const generateWrongOptions = description => description
  .filter(item => item !== null)
  .sort(() => Math.random() - 0.5)
  .slice(0, numberOfWrongOptions);

const convertToSvg = (code, seed) => {
  const elementSize = 28;
  const spaceSize = 4;
  const thickness = 1;
  const numberOfElementsInLine = 3;
  let image = svgCreator.newImage();
  const xPosition = spaceSize
                  + (code % numberOfElementsInLine)
                  * (spaceSize + elementSize);
  const yPosition = spaceSize
                  + Math.floor(code / numberOfElementsInLine)
                  * (spaceSize + elementSize);

  const figures = [
    image.circle,
    image.square,
  ];

  image = figures[seed % figures.length]({
    x: xPosition,
    y: yPosition,
    size: elementSize,
    color: transparentColor,
    borderWidth: thickness,
    borderColor: grayColor,
  });

  return image.getImage();
};

module.exports = problemTemplate.newProblemType(
  generateProblemDescription,
  generateWrongOptions,
  convertToSvg,
);
