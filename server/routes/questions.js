const express = require('express');
const testCreator = require('../problems/test-creator');
const token = require('../utils/token');

const router = express.Router();

// Get questions.
router.get('/', (req, res) => {
  const uid = token.generateToken();
  res.status(200).json({
    token: uid,
    questions: testCreator.createStandardProblemsPack(),
  });
});

module.exports = router;
