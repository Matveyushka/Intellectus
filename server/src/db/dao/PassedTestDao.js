const PassedTest = require('../model/PassedTest');

function insert(test) {
  const passedTest = new PassedTest(test);

  passedTest.save()
    .then(() => console.info('passed_test saved: ', passedTest))
    .catch((err) => console.info('passed_test save failed. ', err));
}

module.exports = { insert };
