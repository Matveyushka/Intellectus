const mongoose = require('mongoose');
const PassedTest = require('../model/PassedTest');
const statisticsDao = require('./StatisticsDao');

const insert = async (test) => {
  const passedTest = new PassedTest(test);

  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    await passedTest.save();

    await statisticsDao.incPoint(passedTest.points);

    await session.commitTransaction();

    session.endSession();

    console.info('passed_test saved: ', passedTest);
  } catch (err) {
    console.error(`passed_test save failed: ${err}`);

    await session.abortTransaction();

    session.endSession();
    throw err;
  }
};

module.exports = { insert };
