const getRightOptions = testPack => testPack.questions.map(item => item.rightOption);
const getProblems = testPack => testPack.questions.map(item => item.problems);
const getOptions = testPack => testPack.questions.map(item => item.options);

// eslint-disable-next-line max-len
const clientTestPack = testPack => testPack.map(task => ({ problems: task.problems, options: task.options }));

const getNumberOfCorrectAnswers = (correctAnswers, userAnswers) =>
  // eslint-disable-next-line max-len,implicit-arrow-linebreak
  userAnswers.filter((userAnswer, indexOfAnswer) => userAnswer === correctAnswers[indexOfAnswer]).length();

module.exports = {
  clientTestPack,
  getNumberOfCorrectAnswers,
  getRightOptions,
  getProblems,
  getOptions,
};
