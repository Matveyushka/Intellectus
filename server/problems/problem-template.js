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
    const svgOrNull = item != null ? converterToSvg(item, seed) : null;
    return svgOrNull;
  });
  return svgArray;
};

const generateRandomSeed = () => Math.floor(Math.random() * 99);

/** @exports */
const createProblem = (
  problemDescriptionGenerator,
  wrongOptionsGenerator,
  converterToSvg,
) => {
  const fullProblemDescription = problemDescriptionGenerator();

  const randomOption = chooseFieldAsRightOption(fullProblemDescription);

  const rightOption = fullProblemDescription[randomOption];

  const readyProblemDescription = fullProblemDescription.map(
    (item, index) => (index === rightOption ? null : item),
  );

  const wrongOptions = createWrongOptions(wrongOptionsGenerator, readyProblemDescription);

  const rightOptionPosition = Math.floor(Math.random() * (wrongOptions.length + 1));

  const options = [
    ...(wrongOptions.slice(0, rightOptionPosition)),
    rightOption,
    ...wrongOptions.slice(rightOptionPosition, wrongOptions.length),
  ];

  const graphicsSeed = Math.floor(Math.random() * generateRandomSeed());

  return {
    problem: convertToSvg(readyProblemDescription, converterToSvg, graphicsSeed),
    options: convertToSvg(options, converterToSvg, graphicsSeed),
    rightOption: rightOptionPosition,
  };
};

module.exports = {
  createProblem,
};
