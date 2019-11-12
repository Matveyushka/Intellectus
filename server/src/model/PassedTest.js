const mongoose = require('mongoose');

const passedTestSchema = mongoose.Schema({
  token: String,
  completionTimestamp: Date,
  elapsedTime: Number,
  points: Number,
  questions: [{
    problemFields: [String],
    options: [String],
    solution: Number,
    answer: Number,
  }],
});

module.exports = passedTestSchema;
