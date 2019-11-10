const _ = require('lodash');

const { numberOfWrongOptions } = require('./constants');

const createWrongOptions = (wrongOptionsGenerator, problemDescription, solution) => {
  const wrongOptions = wrongOptionsGenerator(problemDescription, solution);

  return _.uniqWith(wrongOptions, _.isEqual).length === numberOfWrongOptions
    ? wrongOptions
    : createWrongOptions(wrongOptionsGenerator, problemDescription, solution);
};

const createProblemSvg = (array, converterToSvg, seed) => {
  const svgArray = array.map((item) => {
    const svgOrNull = item !== null
      ? Buffer.from(converterToSvg(item, seed)).toString('base64')
      : null;

    return svgOrNull;
  });

  return svgArray;
};

const seedTopBound = 99;
const generateRandomSeed = () => Math.floor(Math.random() * seedTopBound);

const rotateDescription = (array, times) => (times === 0
  ? array
  : rotateDescription([
    array[6], array[3], array[0],
    array[7], array[4], array[1],
    array[8], array[5], array[2],
  ], times - 1));

const newProblemType = ({
  problemDescriptionGenerator,
  wrongOptionsGenerator,
  converterToSvg,
  rotatable,
}) => ({
  generateProblemDescription: problemDescriptionGenerator,
  generateWrongOptions: wrongOptionsGenerator,
  convertToSvg: converterToSvg,
  isRotatable: rotatable,
});

const createProblem = (problemType) => {
  const problemDescription = problemType.generateProblemDescription();

  const desiredFieldIndex = Math.floor(Math.random() * problemDescription.length);

  const desiredField = problemDescription[desiredFieldIndex];

  const problemFields = problemDescription.map((item, index) => (
    index === desiredFieldIndex ? null : item
  ));

  const wrongOptions = createWrongOptions(
    problemType.generateWrongOptions,
    problemFields,
    desiredField,
  );

  const solutionPosition = Math.floor(Math.random() * (wrongOptions.length + 1));

  const options = [
    ...(wrongOptions.slice(0, solutionPosition)),
    desiredField,
    ...wrongOptions.slice(solutionPosition, wrongOptions.length),
  ];

  const graphicsSeed = Math.floor(Math.random() * generateRandomSeed());

  const rotatedProblemFields = problemType.isRotatable
    ? rotateDescription(problemFields, _.random(0, 3))
    : problemFields;

  return {
    problemFields: createProblemSvg(rotatedProblemFields, problemType.convertToSvg, graphicsSeed),
    options: createProblemSvg(options, problemType.convertToSvg, graphicsSeed),
    solution: solutionPosition,
  };
};

module.exports = {
  newProblemType,
  createProblem,
};
