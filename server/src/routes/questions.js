const express = require('express');
const testCreator = require('../problems/test-creator');
const token = require('../utils/token');
const session = require('../utils/session');
const testPack = require('../utils/testPack');

const router = express.Router();

// Get questions.
router.get('/', (req, res) => {
  const uid = token.generateToken();
  const standardTestPack = testCreator.createStandardProblemsPack();

  session.saveSession(uid, standardTestPack);

  const clientTestPack = testPack.clientTestPack(standardTestPack);

  res.status(200).json({
    token: uid,
    questions: clientTestPack,
  });
});

module.exports = router;
