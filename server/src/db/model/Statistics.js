const mongoose = require('mongoose');

const statisticsSchema = mongoose.Schema({
  pointsDistribution: [Number],
});

const Statistics = mongoose.model('statistics', statisticsSchema);

module.exports = Statistics;
