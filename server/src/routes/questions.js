const express = require('express');
const testCreator = require('../problems/test-creator');
const token = require('../utils/token');
const session = require('../utils/session');

const router = express.Router();

// Get questions.
router.get('/', (req, res) => {
  const uid = token.generateToken();
  const questions = testCreator.createStandardProblemsPack();

  session.saveSession(token, questions);

  res.status(200).json({
    token: uid,
    questions,
  });
});

module.exports = router;
