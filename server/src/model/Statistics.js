const mongoose = require('mongoose');

const statisticsSchema = mongoose.Schema({
  passedTestsCounter: Number,
  averageTime: Number,
  pointsDistribution: [Number],
  averageTimeDistribution: [Number],
});

module.exports = statisticsSchema;
