const getRightOptions = testPack => testPack.questions.map(item => item.rightOption);
const getProblems = testPack => testPack.questions.map(item => item.problems);
const getOptions = testPack => testPack.questions.map(item => item.options);


const clientTestPack = testPack => testPack
  .map(task => ({ problems: task.problems, options: task.options }));

const getNumberOfCorrectAnswers = (correctAnswers, userAnswers) => userAnswers
  .filter((userAnswer, indexOfAnswer) => userAnswer === correctAnswers[indexOfAnswer]).length;

module.exports = {
  clientTestPack,
  getNumberOfCorrectAnswers,
  getRightOptions,
  getProblems,
  getOptions,
};
