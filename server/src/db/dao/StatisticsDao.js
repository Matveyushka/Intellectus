const Statistics = require('../model/Statistics');

const get = async () => {
  let statistics;

  try {
    statistics = new Statistics(await Statistics.findOne());

    return statistics.pointsDistribution;
  } catch (err) {
    console.error(`Get statistics failed: ${err}`);
    throw err;
  }
};

const increasePointsDistributionAt = async (points) => {
  try {
    const statistics = new Statistics(await Statistics.findOne());

    statistics.pointsDistribution[points] += 1;

    await Statistics.update(statistics);

    console.info('statistics updated');
  } catch (err) {
    console.error(`Increment statistics point failed: ${err}`);
    throw err;
  }
};

module.exports = { get, increasePointsDistributionAt };
