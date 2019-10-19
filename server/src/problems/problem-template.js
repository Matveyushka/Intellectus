const { numberOfWrongOptions } = require('./constants');

const createWrongOptions = (wrongOptionsGenerator, problemDescription) => {
  const wrongOptions = wrongOptionsGenerator(problemDescription);

  return [...new Set(wrongOptions)].length === numberOfWrongOptions
    ? wrongOptions
    : createWrongOptions(wrongOptionsGenerator, problemDescription);
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

const newProblemType = (
  problemDescriptionGenerator,
  wrongOptionsGenerator,
  converterToSvg,
) => ({
  generateProblemDescription: problemDescriptionGenerator,
  generateWrongOptions: wrongOptionsGenerator,
  convertToSvg: converterToSvg,
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
  );

  const solutionPosition = Math.floor(Math.random() * (wrongOptions.length + 1));

  const options = [
    ...(wrongOptions.slice(0, solutionPosition)),
    desiredField,
    ...wrongOptions.slice(solutionPosition, wrongOptions.length),
  ];

  const graphicsSeed = Math.floor(Math.random() * generateRandomSeed());

  return {
    problemFields: createProblemSvg(problemFields, problemType.convertToSvg, graphicsSeed),
    options: createProblemSvg(options, problemType.convertToSvg, graphicsSeed),
    solution: solutionPosition,
  };
};

module.exports = {
  newProblemType,
  createProblem,
};
