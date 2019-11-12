const mongoose = require('mongoose');
const PassedTestSchema = require('./model/PassedTest');
const StatisticsSchema = require('./model/Statistics');

const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const PassedTest = mongoose.model('passed_test', PassedTestSchema);
const Statistics = mongoose.model('statistics', StatisticsSchema);

const initializeStatistics = async () => Statistics.create({
  passedTestsCounter: 0,
  averageTime: 0,
  pointsDistribution: Array(13).fill(0),
  averageTimeDistribution: Array(13).fill(0),
});

const recalculateStatistics = async (passedTest, opts) => {
  const recalculateAverage = (
    currentValue,
    counter,
    increment,
  ) => Math.round((currentValue * counter + increment) / (counter + 1));

  const statistics = await Statistics.findOne();

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

  await Statistics.updateOne(statistics, {
    passedTestsCounter: newPassedTestsCounter,
    averageTime: newAverageTime,
    pointsDistribution: newPointsDistribution,
    averageTimeDistribution: newAverageTimeDistribution,
  }, opts);
};

const initializeDB = async () => {
  await PassedTest.createCollection();

  await Statistics.createCollection();

  if (!await Statistics.findOne()) await initializeStatistics();
};

const startBackup = async () => {
  try {
    const backupConnection = await mongoose.createConnection(
      process.env.MONGO_BACKUP_URI,
      connectionOptions,
    );

    console.info('BackupDB connected.');

    const PassedTestBackupModel = backupConnection.model('passed_test', PassedTestSchema);
    const StatisticsBackupModel = backupConnection.model('statistics', StatisticsSchema);

    const lastBackupedPassedTest = await PassedTestBackupModel
      .findOne({}, {}, { sort: { completionTimestamp: -1 } });
    const lastUpdate = lastBackupedPassedTest
      ? lastBackupedPassedTest.completionTimestamp
      : new Date(0);

    const backupPassedTests = async () => {
      const passedTestDocs = await PassedTest.find({ completionTimestamp: { $gt: lastUpdate } });

      passedTestDocs.forEach((item) => {
        const passedTest = {
          token: item.token,
          completionTimestamp: item.completionTimestamp,
          elapsedTime: item.elapsedTime,
          points: item.points,
          questions: item.questions,
        };
        const passedTestBackup = new PassedTestBackupModel(passedTest);

        passedTestBackup.save();
      });
    };

    const backupStatistics = async () => {
      const statisticsDoc = await Statistics.findOne();
      const statistics = {
        passedTestsCounter: statisticsDoc.passedTestsCounter,
        averageTime: statisticsDoc.averageTime,
        pointsDistribution: statisticsDoc.pointsDistribution,
        averageTimeDistribution: statisticsDoc.averageTimeDistribution,
      };
      const statisticsBackup = new StatisticsBackupModel(statistics);

      statisticsBackup.save();
    };

    const updateBackup = async () => {
      console.info('Backup update starts');

      backupPassedTests();

      backupStatistics();

      console.info('Backup saved');
    };

    const msPerDay = 1000 * 60 * 60 * 24;

    if (new Date().getTime() - lastUpdate.getTime() >= msPerDay) {
      updateBackup();

      setInterval(async () => { updateBackup(); }, msPerDay);
    }
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
};

/** @exports */
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, connectionOptions);

    console.info('MongoDB connected.');

    await initializeDB();

    startBackup();
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
};

const savePassedTest = async (test) => {
  const passedTest = new PassedTest(test);

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const opts = { session };

    await passedTest.save(opts);

    await recalculateStatistics(passedTest, opts);

    await session.commitTransaction();

    console.info('passed_test saved');
  } catch (err) {
    console.error(`passed_test save failed: ${err}`);

    await session.abortTransaction();

    throw err;
  } finally {
    session.endSession();
  }
};

const getStatistics = () => Statistics.findOne();

module.exports = { connect, savePassedTest, getStatistics };
