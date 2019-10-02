const Statistics = require('../model/Statistics');

const get = async () => {
  let statistics;

  try {
    statistics = new Statistics(await Statistics.findOne());

    return statistics.frequencyDistribution;
  } catch (err) {
    console.error(`Get statistics failed: ${err}`);
    throw err;
  }
};

const incPoint = async (point) => {
  try {
    const statistics = new Statistics(await Statistics.findOne());

    statistics.frequencyDistribution[point] += 1;

    await Statistics.update(statistics);

    console.info('statistics updated: ', statistics);
  } catch (err) {
    console.error(`Increment statistics point failed: ${err}`);
    throw err;
  }
};

module.exports = { get, incPoint };
