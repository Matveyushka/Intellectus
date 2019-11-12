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

//const PassedTest = mongoose.model('passed_test', passedTestSchema);

module.exports = passedTestSchema;
