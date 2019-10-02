const rightOptions = testPack => testPack.map(item => item.rightOption);

// eslint-disable-next-line max-len
const clientTestPack = testPack => testPack.map(task => ({ problem: task.problem, options: task.options }));

module.exports = {
  rightOptions,
  clientTestPack,
};
