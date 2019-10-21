const getSolutions = testPack => testPack.questions.map(item => item.solution);
const getProblemFields = testPack => testPack.questions.map(item => item.problemFields);
const getOptions = testPack => testPack.questions.map(item => item.options);

const clientTestPack = testPack => testPack
  .map(task => ({ problemFields: task.problemFields, options: task.options }));

const getNumberOfCorrectAnswers = (correctAnswers, userAnswers) => userAnswers
  .filter((userAnswer, indexOfAnswer) => userAnswer === correctAnswers[indexOfAnswer]).length;

module.exports = {
  clientTestPack,
  getNumberOfCorrectAnswers,
  getSolutions,
  getProblemFields,
  getOptions,
};
