const chooseFieldAsRightOption = (problemDescription) => {
  const randomField = Math.floor(Math.random() * problemDescription.length);

  return randomField;
};

const createWrongOptions = (wrongOptionsGenerator, problemDescription) => {
  const wrongOptions = wrongOptionsGenerator(problemDescription);

  return wrongOptions;
};

const convertToSvg = (array, converterToSvg, seed) => {
  const svgArray = array.map((item) => {
    const svgOrNull = item !== null
      ? Buffer.from(converterToSvg(item, seed)).toString('base64')
      : null;

    return svgOrNull;
  });

  return svgArray;
};

const generateRandomSeed = () => Math.floor(Math.random() * 99);

/** @exports */
const newProblemType = (
  problemDescriptionGenerator,
  wrongOptionsGenerator,
  converterToSvg,
) => ({
  generateTaskDescription: problemDescriptionGenerator,
  generateWrongOptions: wrongOptionsGenerator,
  convertToSvg: converterToSvg,
});

/** @exports */
const realizeProblem = (problemType) => {
  const fullProblemDescription = problemType.generateTaskDescription();

  const randomOption = chooseFieldAsRightOption(fullProblemDescription);

  const rightOption = fullProblemDescription[randomOption];

  const readyProblemDescription = fullProblemDescription.map((item, index) => (
    index === randomOption ? null : item
  ));

  const wrongOptions = createWrongOptions(
    problemType.generateWrongOptions,
    readyProblemDescription,
  );

  const rightOptionPosition = Math.floor(Math.random() * (wrongOptions.length + 1));

  const options = [
    ...(wrongOptions.slice(0, rightOptionPosition)),
    rightOption,
    ...wrongOptions.slice(rightOptionPosition, wrongOptions.length),
  ];

  const graphicsSeed = Math.floor(Math.random() * generateRandomSeed());

  return {
    problemFields: convertToSvg(readyProblemDescription, problemType.convertToSvg, graphicsSeed),
    options: convertToSvg(options, problemType.convertToSvg, graphicsSeed),
    solution: rightOptionPosition,
  };
};

module.exports = {
  newProblemType,
  realizeProblem,
};
