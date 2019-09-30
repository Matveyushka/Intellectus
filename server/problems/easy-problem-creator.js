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

const easyProblemCreator = {};

const borderColor = '#636363';
const fillColor = 'rgba(0,0,0,0)';

const problemTypes = [
  //  Тип тестового задания хранится в виде анонимного объекта,
  //  имеющего 3 функции, описывающие этот тип задачек.

  //  Функция description создаёт решённую задачу - одно поле из неё изымается
  //  позднее и становится правильным вариантом ответа.

  //  Функция answers создаёт 5 неверных вариантов ответа

  //  Функция svg описывает варианты изображения условия задачи.

  //  Такое количество комментариев обусловлено тем, что я пока не уверен,
  //  как это стоило бы реализовать.
  {
    description: () => [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5),
    answers: (description) => description
      .filter((e) => e != null)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5),
    svg: (code, seed) => {
      const elementSize = 28;
      const spaceSize = 4;
      const thickness = 1;
      const image = svgCreator.newImage();

      //  Прошу прощения за магию.
      const x = spaceSize + (code % 3) * (spaceSize + elementSize);
      const y = spaceSize + Math.floor(code / 3) * (spaceSize + elementSize);

      const figures = [
        image.circle,
        image.square,
      ];

      figures[seed % figures.length](x, y, elementSize, fillColor, thickness, borderColor);
      return image.image;
    },
  },
];

easyProblemCreator.createProblem = () => {
  const problemType = Math.floor(Math.random() * problemTypes.length);
  const problem = problemTemplate.createProblem(
    problemTypes[problemType].description,
    problemTypes[problemType].answers,
    problemTypes[problemType].svg,
  );
  return problem;
};

module.exports = easyProblemCreator;
