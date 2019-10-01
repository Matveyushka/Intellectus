const mongoose = require('mongoose');

const statisticsSchema = mongoose.Schema({
  cnt: [Number],
});

const Statistics = mongoose.model('statistics', statisticsSchema);

module.exports = Statistics;
