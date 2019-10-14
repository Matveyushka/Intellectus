const mongoose = require('mongoose');
const PassedTest = require('./model/PassedTest');
const Statistics = require('./model/Statistics');

const initializeStatistics = async () => Statistics.create({
  passedTestsCounter: 0,
  averageTime: 0,
  pointsDistribution: Array(13).fill(0),
  averageTimeDistribution: Array(13).fill(0),
});

const recalculateStatistics = async (passedTest) => {
  const recalculateAverage = (
    currentValue,
    counter,
    increment,
  ) => Math.round((currentValue * counter + increment) / (counter + 1));

  let statistics = await Statistics.findOne();

  if (!statistics) statistics = await initializeStatistics();

  const newPassedTestsCounter = statistics.passedTestsCounter + 1;

  const newAverageTime = recalculateAverage(
    statistics.averageTime,
    statistics.passedTestsCounter,
    passedTest.elapsedTime,
  );

  const incrementIndex = passedTest.points;

  const newPointsDistribution = statistics.pointsDistribution.slice();

  newPointsDistribution[incrementIndex] += 1;

  const newAverageTimeDistribution = statistics.averageTimeDistribution.slice();

  newAverageTimeDistribution[incrementIndex] = recalculateAverage(
    statistics.averageTimeDistribution[incrementIndex],
    statistics.pointsDistribution[incrementIndex],
    passedTest.elapsedTime,
  );

  await Statistics.update({}, {
    passedTestsCounter: newPassedTestsCounter,
    averageTime: newAverageTime,
    pointsDistribution: newPointsDistribution,
    averageTimeDistribution: newAverageTimeDistribution,
  });
};

/** @exports */
const savePassedTest = async (test) => {
  const passedTest = new PassedTest(test);

  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    await passedTest.save();

    await recalculateStatistics(passedTest);

    await session.commitTransaction();

    session.endSession();

    console.info('passed_test saved');
  } catch (err) {
    console.error(`passed_test save failed: ${err}`);

    await session.abortTransaction();

    session.endSession();
    throw err;
  }
};

const getStatistics = () => Statistics.findOne();

module.exports = { savePassedTest, getStatistics };
