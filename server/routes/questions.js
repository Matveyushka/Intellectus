const express = require('express');
const testCreator = require('../problems/test-creator');

const router = express.Router();

// Get questions.
router.get('/', (req, res) => {
  const token = new Date().getTime().toString(33);
  res.status(200).json({
    token,
    questions: testCreator.createStandardProblemsPack(),
  });
});
module.exports = router;
