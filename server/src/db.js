const mongoose = require('mongoose');
const PassedTestSchema = require('./model/PassedTest');
const StatisticsSchema = require('./model/Statistics');

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

/** @exports */
const connect = async () => {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => { 
      console.info('MongoDB connected.');
      await initializeDB();

      startBackup();
    })
    .catch((err) => {
      console.error(`MongoDB connection error: ${err}`);
    })
}

const initializeDB = async () => {
  await PassedTest.createCollection();

  await Statistics.createCollection();

  if (!await Statistics.findOne()) await initializeStatistics();
};

const startBackup = async () => {
  try {
    const backupConnection = await mongoose.createConnection(
      process.env.MONGO_BACKUP_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    
    console.info('BackupDB connected.');

    const PassedTestBackupModel = backupConnection.model('passed_test', PassedTestSchema);
    const StatisticsBackupModel = backupConnection.model('statistics', StatisticsSchema);

    const lastPassedTestBackup = await PassedTestBackupModel.findOne({}, {}, { sort: { 'completionTimestamp': -1 }})
    const lastUpdate = lastPassedTestBackup? lastPassedTestBackup.completionTimestamp : new Date(0);
    console.log(lastUpdate)

    const msInDay = 1000*60*60*24;

    const updateBackup = async () => {
      console.info('Backup update starts');
      const passedTestDocs = await PassedTest.find({completionTimestamp: { $gt: lastUpdate }})
      passedTestDocs.map(item => {
        const passedTest = {
          token: item.token,
          completionTimestamp: item.completionTimestamp,
          elapsedTime: item.elapsedTime,
          points: item.points,
          questions: item.questions
        }
        const passedTestBackup = new PassedTestBackupModel(passedTest);
        passedTestBackup.save()
      })

      const statisticsDoc = await Statistics.findOne();
      const statistics = {
        passedTestsCounter: statisticsDoc.passedTestsCounter,
        averageTime: statisticsDoc.averageTime,
        pointsDistribution: statisticsDoc.pointsDistribution,
        averageTimeDistribution: statisticsDoc.averageTimeDistribution,
      }
      const statisticsBackup = new StatisticsBackupModel(statistics);
      statisticsBackup.save()

      console.info('Backup saved')
    }

    console.log(new Date().getTime() - lastUpdate.getTime())
    if (new Date().getTime() - lastUpdate.getTime() >= msInDay) {
      updateBackup();
      setInterval(async () => { updateBackup() }, msInDay)
    }
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}

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

module.exports = { connect, initializeDB, savePassedTest, getStatistics };
