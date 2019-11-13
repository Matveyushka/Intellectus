const mongoose = require('mongoose');
const PassedTestSchema = require('./model/PassedTest');
const StatisticsSchema = require('./model/Statistics');

let backupConnection;
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

  await Statistics.updateOne(
    statistics,
    {
      passedTestsCounter: newPassedTestsCounter,
      averageTime: newAverageTime,
      pointsDistribution: newPointsDistribution,
      averageTimeDistribution: newAverageTimeDistribution,
    },
    opts,
  );
};

const initializeDB = async () => {
  await PassedTest.createCollection();

  await Statistics.createCollection();

  if (!await Statistics.findOne()) await initializeStatistics();
};

const connectBackupDb = async () => {
  if (backupConnection) return;

  try {
    backupConnection = await mongoose.createConnection(
      process.env.MONGO_BACKUP_URI,
      connectionOptions,
    );

    console.info('BackupDB connected.');
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
};

const savePassedTestsFromDocs = async (passedTestDocs, Model) => {
  passedTestDocs.forEach((item) => {
    const passedTest = {
      token: item.token,
      completionTimestamp: item.completionTimestamp,
      elapsedTime: item.elapsedTime,
      points: item.points,
      questions: item.questions,
    };
    const passedTestModel = new Model(passedTest);

    passedTestModel.save();
  });
};

const saveStatisticsFromDoc = async (statisticsDoc, Model) => {
  const statistics = {
    passedTestsCounter: statisticsDoc.passedTestsCounter,
    averageTime: statisticsDoc.averageTime,
    pointsDistribution: statisticsDoc.pointsDistribution,
    averageTimeDistribution: statisticsDoc.averageTimeDistribution,
  };
  const statisticsModel = new Model(statistics);

  statisticsModel.save();
};

const restoreDbFromBackup = async () => {
  await connectBackupDb();

  console.info('Database recovery from backup has begun.');
  const PassedTestBackupModel = backupConnection.model('passed_test', PassedTestSchema);
  const StatisticsBackupModel = backupConnection.model('statistics', StatisticsSchema);

  const passedTestDocs = PassedTestBackupModel.find();
  const statisticsDoc = StatisticsBackupModel
    .findOne({}, {}, { sort: { completionTimestamp: -1 } });

  await savePassedTestsFromDocs(await passedTestDocs, PassedTest);

  await saveStatisticsFromDoc(await statisticsDoc, Statistics);

  console.info('Database has been restored from backup.');
};

const startBackup = async () => {
  await connectBackupDb();

  const PassedTestBackupModel = backupConnection.model('passed_test', PassedTestSchema);
  const StatisticsBackupModel = backupConnection.model('statistics', StatisticsSchema);

  const lastBackupedPassedTest = await PassedTestBackupModel
    .findOne({}, {}, { sort: { completionTimestamp: -1 } });
  const lastUpdate = lastBackupedPassedTest
    ? lastBackupedPassedTest.completionTimestamp
    : new Date(0);

  const backupPassedTests = async () => {
    const passedTestDocs = await PassedTest.find({ completionTimestamp: { $gt: lastUpdate } });

    await savePassedTestsFromDocs(passedTestDocs, PassedTestBackupModel);
  };

  const backupStatistics = async () => {
    const statisticsDoc = await Statistics.findOne();

    await saveStatisticsFromDoc(statisticsDoc, StatisticsBackupModel);
  };

  const updateBackup = async () => {
    console.info('Backup update starts');

    await backupPassedTests();

    await backupStatistics();

    console.info('Backup saved');
  };

  const msPerDay = 1000 * 60 * 60 * 24;

  if (new Date().getTime() - lastUpdate.getTime() >= msPerDay) {
    updateBackup();

    setInterval(async () => { updateBackup(); }, msPerDay);
  }
};

const connectMainDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, connectionOptions);

    console.info('MongoDB connected.');
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
};

/** @exports */
const connect = async () => {
  await connectMainDb();

  await initializeDB();

  await startBackup();
};

/*
 * Use this function instead of connect () if you want to restore the database from a backup.
 * Replace back to connect () after recovery.
 */
const connectAndRestore = async () => {
  await connectMainDb();

  await restoreDbFromBackup();

  await startBackup();
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

module.exports = {
  connect,
  connectAndRestore,
  savePassedTest,
  getStatistics,
};
