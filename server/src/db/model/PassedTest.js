const mongoose = require('mongoose');

const passedTestSchema = mongoose.Schema({
  token: String,
  elapsedTime: Number,
  points: Number,
  questions: [{
    problem: [String],
    options: [String],
    solutions: [String],
    answers: [String],
  }],
});

const PassedTest = mongoose.model('passed_test', passedTestSchema);

module.exports = PassedTest;
