const mongoose = require('mongoose');

const statisticsSchema = mongoose.Schema({
  frequencyDistribution: [Number],
});

const Statistics = mongoose.model('statistics', statisticsSchema);

module.exports = Statistics;
