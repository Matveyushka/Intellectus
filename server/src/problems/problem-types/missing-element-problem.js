const svgCreator = require('../svg-creator');
const problemTemplate = require('../problem-template');

const strokeColor = '#636363';
const fillColor = 'rgba(0,0,0,0)';

const generateTaskDescription = () => [0, 1, 2, 3, 4, 5, 6, 7, 8]
  .sort(() => Math.random() - 0.5);

const generateWrongOptions = description => description
  .filter(item => item != null)
  .sort(() => Math.random() - 0.5)
  .slice(0, 5);

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
    color: fillColor,
    borderWidth: thickness,
    borderColor: strokeColor,
  });

  return image.getImage();
};

module.exports = problemTemplate.newProblemType(
  generateTaskDescription,
  generateWrongOptions,
  convertToSvg,
);
