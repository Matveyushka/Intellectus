/*
  Планируется создать ещё два файла с подобной структурой,
  но описывающие задачи более сложного уровня.

  Вероятнее всего следующие файлы будут иметь имена
  medium-problem-creator.js
  и
  hard-problem-creator.js

  По сути этот файл -
  просто контейнер с алгоритмами для создания задачек лёгкого уровня.
*/

const problemTemplate = require('./problem-template');
const svgCreator = require('./svg-creator');

const strokeColor = '#636363';
const fillColor = 'rgba(0,0,0,0)';

const problemTypes = [
  {
    generateTaskDescription: () => [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5),
    generateWrongOptions: (description) => description
      .filter((item) => item != null)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5),
    convertToSvg: (code, seed) => {
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
    },
  },
];

/** @exports */
const createProblem = () => {
  const problemType = Math.floor(Math.random() * problemTypes.length);
  return problemTemplate.createProblem(
    problemTypes[problemType].generateTaskDescription,
    problemTypes[problemType].generateWrongOptions,
    problemTypes[problemType].convertToSvg,
  );
};

module.exports = {
  createProblem,
};
