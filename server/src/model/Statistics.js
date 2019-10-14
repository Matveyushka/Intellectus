const mongoose = require('mongoose');

const statisticsSchema = mongoose.Schema({
  passedTestsCounter: Number,
  averageTime: Number,
  pointsDistribution: [Number],
  averageTimeDistribution: [Number],
});

const Statistics = mongoose.model('statistics', statisticsSchema);

module.exports = Statistics;
