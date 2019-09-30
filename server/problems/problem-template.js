const problemTemplate = {};

const createProblemDescription = (problemDescriptionGenerator) => problemDescriptionGenerator();

const chooseFieldAsRightAnswer = (problemDescription) => {
  const randomField = Math.floor(Math.random() * problemDescription.length);
  return randomField;
};

const createWrongAnswers = (wrongAnswersGenerator, problemDescription) => {
  const wrongAnswers = wrongAnswersGenerator(problemDescription);
  return wrongAnswers;
};

const convertToSvg = (array, converterToSvg, seed) => {
  const svgArray = array.map((e) => {
    const svgOrNull = e != null ? converterToSvg(e, seed) : null;
    return svgOrNull;
  });
  return svgArray;
};

const generateRandomSeed = () => Math.floor(Math.random() * 99);

problemTemplate.createProblem = (problemDescriptionGenerator,
  wrongAnswersGenerator,
  converterToSvg) => {
  const problemDescription = createProblemDescription(problemDescriptionGenerator);

  const randomAnswer = chooseFieldAsRightAnswer(problemDescription);

  const rightAnswer = problemDescription[randomAnswer];

  problemDescription[randomAnswer] = null;

  const answers = createWrongAnswers(wrongAnswersGenerator, problemDescription);

  const rightAnswerPosition = Math.floor(Math.random() * (answers.length + 1));

  answers.splice(rightAnswerPosition, 0, rightAnswer);

  const graphicsSeed = Math.floor(Math.random() * generateRandomSeed());

  return {
    problem: convertToSvg(problemDescription, converterToSvg, graphicsSeed),
    options: convertToSvg(answers, converterToSvg, graphicsSeed),
    rightAnswer: rightAnswerPosition,
  };
};

module.exports = problemTemplate;
